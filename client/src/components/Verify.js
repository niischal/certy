import React, { useEffect, useState } from "react";
import Sha256 from "../Sha256";
import FileBuffer from "../FIleBuffer";
import { Link } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Verify = () => {
  const [file, setFile] = useState(null);
  //const [hash, setHash] = useState();
  const [fileBufferHash, setFileBufferHash] = useState();

  const [sizeError, setSizeError] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
  };
  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const BufferString = async () => {
    try {
      const fileBuffer = await FileBuffer.buffer(file);
      const hash = Sha256.hash(fileBuffer);
      setFileBufferHash(hash);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (file && file.size > 102400) {
      console.log("file limit exceeds");
      setSizeError(true);
    } else if (file && file.size < 102400) {
      BufferString();
    }
  }, [file]);

  // const handleVerify = async () => {
  //   const contract = await getContractInfo();
  //   if (!contract.loading) {
  //     const result = await contract.contract.methods
  //       .check(fileBufferHash)
  //       .call();
  //     setResult(result);
  //   }
  //   console.log("result", result);
  // };
  // console.log(sizeError);
  const handleFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.onchange = handleFileInput;
  };
  return (
    <>
      {!file && !sizeError && (
        <div
          className="col verify-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDoubleClick={handleFile}
        >
          <h1 id="p1">Drag Certificate to Verify or</h1>
          {/* <h1>or</h1> */}
          <h1>Double click to select</h1>
          <button
            className="upload-btn"
            onClick={handleFile}
            style={{ marginLeft: "33%" }}
          >
            <AiOutlineCloudUpload style={{ marginRight: "5px" }} />
            Upload Certificate
          </button>
        </div>
      )}
      {file && !sizeError && (
        <div className="col verify-box">
          {/* {file[0].name} ({file[0].size} bytes) */}
          <div className="hash-box">
            <h4>File: {file.name}</h4>
          </div>
          {/* {fileBufferHash} */}
          <Link to={`/verificationResult/${fileBufferHash}`}>
            <button className="upload-btn" style={{ marginLeft: "42%" }}>
              Verify
            </button>
          </Link>
        </div>
      )}
      {sizeError && (
        <div className="col verify-box">
          <h4 style={{ marginLeft: "30%", marginTop: "30%" }}>
            File Size Limit Exceeded!
          </h4>
        </div>
      )}
    </>
  );
};

export default Verify;
