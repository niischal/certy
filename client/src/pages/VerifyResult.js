import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import VerifiedBadge from "../components/VerifiedBadge";
import { useParams } from "react-router";
import Error from "../components/Error";
import Loader from "../components/Loader";
import getContractInfo from "../web3";
import axios from "axios";
import FileViewer from "../components/FileViewer";

const VerifyResult = () => {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { cid } = useParams();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [result, setResult] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState("");
  const [uri, setUri] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [program, setProgram] = useState("");
  useEffect(() => {
    setStatus(STATUS.LOADING);
    handleVerify();
    // if (result) {
    //   getCertificateInfo();
    // }

    getCertificateInfo();
  }, [result]);

  const handleVerify = async () => {
    const contract = await getContractInfo();
    if (!contract.loading) {
      console.log("contract", contract);
      const result = await contract.contract.methods
        .check(cid)
        .call()
        .catch((err) => console.log("Certificate Does Not Exists"));
      if (result) {
        setResult(result);
      } else {
        setStatus(STATUS.ERROR);
      }
    }
  };
  const getCertificateInfo = async () => {
    if (status !== STATUS.ERROR) {
      const contract = await getContractInfo();
      if (!contract.loading) {
        const certificateDetails = await contract.contract.methods
          .getCertificate(cid)
          .call();
        setCertificateDetails(certificateDetails);
        await getUri();
        await getIssuerName();
        // getUri();
      }
    }
  };

  const getUri = async () => {
    await axios
      .post("/api/general/getCertificateByCid", { cid })
      .then((res) => {
        fetch(res.data.url)
          .then((res) => res.blob())
          .then((imageBlob) => {
            setUri(URL.createObjectURL(imageBlob));
          });
      })
      .catch((err) => console.log("err", err));
  };
  const getIssuerName = async () => {
    if (certificateDetails) {
      const request = {
        id: await certificateDetails.issuerName,
        programName: await certificateDetails.program,
      };
      await axios
        .post("/api/general/getIssuerById", { request })
        .then((res) => {
          setIssuerName(res.data.issuer);
          setProgram(res.data.program[0]);
          setStatus(STATUS.SUCCESS);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container-rounded mx-auto p-4">
      {status === STATUS.LOADING ? (
        <Loader />
      ) : (
        <>
          {!result && status === STATUS.ERROR && (
            <Error error="Certificate Verification Failed" />
          )}
          {result && status === STATUS.SUCCESS && (
            <>
              <div className="upper-part p-2">
                <h4 className="mb-0">{certificateDetails.holderName}</h4>
                <div className="verified-section">
                  <VerifiedBadge />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 p-2">
                  <label>
                    <strong>Program: </strong>
                    {certificateDetails.program}
                  </label>
                </div>
                <div className="col-md-6 p-2">
                  <label>
                    <strong>Issued By: </strong>
                    {issuerName}
                  </label>
                </div>
                <div className="col-md-6 p-2">
                  <label>
                    <strong>Start Date: </strong>
                    {new Date(
                      program.dateOfProgramInitiation
                    ).toLocaleDateString(undefined, options)}
                  </label>
                </div>
                <div className="col-md-6 p-2">
                  <label>
                    <strong>Completion Date: </strong>
                    {new Date(program.dateOfCompletion).toLocaleDateString(
                      undefined,
                      options
                    )}
                  </label>
                </div>
                <div className="col-md-6 p-2">
                  <label>
                    <strong>Issued Date: </strong>
                    {certificateDetails.timestamp}
                  </label>
                </div>
              </div>
              <div className="fileViewer">
                {console.log("uri", uri)}
                <FileViewer uri={uri} />
              </div>
              <hr />
              <div className="lower-part text-center">
                <h5>@CERTY</h5>
                <p style={{ fontSize: "12px" }}>
                  Decentralized Certificate Verification Using SHA-256 Algorithm
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default VerifyResult;
