import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import getContractInfo from "../web3";
import Sha256 from "../Sha256";
import FileBuffer from "../FIleBuffer";

function IssueCertificate() {
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
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser._id;
    await axios
      .post("/api/issuer/getIssuerById", { userId })
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
      console.log("file exceeds limit");
      return;
    }
    BufferString();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
    console.log("fileBufferHash", fileBufferHash);
    const data = { certificateDetails, currentUser };
    try {
      console.log("certificateFile", certificateFile);
      await axios
        .post("/api/issuer/issueCertificate", formData, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          console.log("res", res);
          const contract = await getContractInfo();
          console.log("contract", contract);
          if (!contract.loading) {
            await contract.contract.methods
              .storeCertificate(
                fileBufferHash,
                certificateDetails.firstName +
                  " " +
                  certificateDetails.lastName,
                currentUser._id,
                certificateDetails.programName,
                certificateDetails.issuedDate
              )
              .send({ from: currentUser.address });
          }
          setCertificateFile(null);
          setCertificateDetails(initialState);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="m-5" style={{ marginLeft: "2rem" }}>
      <h3 className="mb-3">IssueCertificate</h3>
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
      </div>
    </div>
  );
}

export default IssueCertificate;
