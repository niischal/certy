import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import getContractInfo from "../web3";
import Sha256 from "../Sha256";
import FileBuffer from "../FIleBuffer";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import WalletConnect from "./WalletConnect";

function IssueCertificate() {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [msg, setMsg] = useState("");
  const initialState = {
    firstName: "",
    lastName: "",
    programName: "",
    issuedDate: "",
  };
  const [certificateDetails, setCertificateDetails] = useState(initialState);
  const [programs, setPrograms] = useState(null);
  const [certificateFile, setCertificateFile] = useState("");
  const [fileBufferHash, setFileBufferHash] = useState();

  const [currentAddress, setCurrentAddress] = useState();
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser._id;
    await axios
      .post(
        "/api/issuer/getIssuerById",
        { userId },
        {
          headers: {
            issuerId: userId,
          },
        }
      )
      .then((res) => {
        setPrograms(res.data.programs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    let files = e.target.files[0];
    setCertificateFile(files);
  };
  const BufferString = async () => {
    try {
      const fileBuffer = await FileBuffer.buffer(certificateFile);
      const hash = Sha256.hash(fileBuffer);
      setFileBufferHash(hash);
    } catch (error) {
      console.error(error);
    }
  };
  const issueCertificate = async (e) => {
    e.preventDefault();
    if (!certificateFile) {
      console.log("no file chosen");
      return;
    }
    if (certificateFile.size > 102400) {
      setStatus(STATUS.ERROR);
      setMsg("File Exceeds Limit");
      return;
    }

    BufferString();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentAddress !== currentUser.address) {
      setStatus(STATUS.ERROR);
      setMsg("Wallet Address Does not Match");
      return;
    }
    const formData = new FormData();
    formData.append("file", certificateFile);
    formData.append("currentUserId", currentUser._id);
    formData.append(
      "holderName",
      certificateDetails.firstName + " " + certificateDetails.lastName
    );
    formData.append("programName", certificateDetails.programName);
    formData.append("issuedDate", certificateDetails.issuedDate);
    formData.append("cid", fileBufferHash);
    formData.append("currentUser", currentUser);
    console.log("fileBufferHash", fileBufferHash);
    const data = { certificateDetails, currentUser };

    const contract = await getContractInfo();
    if (!contract.loading) {
      await contract.contract.methods
        .storeCertificate(
          fileBufferHash,
          certificateDetails.firstName + " " + certificateDetails.lastName,
          currentUser._id,
          certificateDetails.programName,
          certificateDetails.issuedDate
        )
        .send({ from: currentUser.address })
        .then(async (res) => {
          await axios
            .post(
              "/api/issuer/issueCertificate",

              formData,

              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  issuerId: currentUser._id,
                },
              }
            )
            .then(async (res) => {
              setStatus(STATUS.SUCCESS);
              setMsg(res.data.msg);
              setCertificateFile("");
              setCertificateDetails(initialState);
            })
            .catch((err) => {
              setStatus(STATUS.ERROR);
              setMsg(err.response.data.message);
            });
        })
        .catch((err) => {
          setStatus(STATUS.ERROR);
          setMsg("Error Occured");
        });
    }
  };

  return (
    <div className="m-5" style={{ marginLeft: "2rem" }}>
      <h3 className="mb-3">IssueCertificate</h3>
      <WalletConnect address={currentAddress} setAddress={setCurrentAddress} />
      <div className="card justify-content-center p-4">
        <form onSubmit={issueCertificate}>
          <div className="row">
            <div className="col-6 p-2">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={certificateDetails.firstName}
                onChange={(e) =>
                  setCertificateDetails({
                    ...certificateDetails,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="col-6 p-2">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={certificateDetails.lastName}
                onChange={(e) =>
                  setCertificateDetails({
                    ...certificateDetails,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 p-2">
              <label>Program Name</label>

              <select
                className="form-select "
                value={certificateDetails.programName}
                onChange={(e) =>
                  setCertificateDetails({
                    ...certificateDetails,
                    programName: e.target.value,
                  })
                }
                required
              >
                <option disabled value="">
                  Select Program.....
                </option>
                {programs &&
                  programs.map((program, i) => {
                    return (
                      <option key={i + 1} value={program.programName}>
                        {program.programName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-6 p-2">
              <label>Issued Date</label>
              <input
                type="date"
                className="form-control"
                value={certificateDetails.issuedDate}
                onChange={(e) =>
                  setCertificateDetails({
                    ...certificateDetails,
                    issuedDate: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 p-2 mb-2">
              <label>Document</label>
              <input
                type="file"
                className="form-control-file"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="solid-btn text-center">
              Issue Certificate
            </button>
          </div>
        </form>
        <div className="mt-3">
          {status === STATUS.LOADING && <Loader />}
          {status === STATUS.SUCCESS && (
            <Success success="Certificate Issued" />
          )}
          {status === STATUS.ERROR && <Error error={msg} />}
        </div>
      </div>
    </div>
  );
}

export default IssueCertificate;
