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
    console.log("file", file);
    if (file && file.size > 102400) {
      console.log("file limit exceeds");
      setSizeError(true);
    } else if (file && file.size < 102400) {
      console.log("file", file);
      console.log("fileBufferHash", fileBufferHash);
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
  return (
    <>
      {!file && !sizeError && (
        <div
          className="col verify-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDoubleClick={() => {
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.click();
            fileInput.onchange = handleFileInput;
          }}
        >
          <h1 id="p1">Drag Certificate to Verify or</h1>
          {/* <h1>or</h1> */}
          <h1>Double click to select</h1>
          <label className="upload-btn">
            <AiOutlineCloudUpload style={{ marginRight: "5px" }} />
            Upload Certificate
          </label>
        </div>
      )}
      {file && !sizeError && (
        <div className="col verify-box">
          {/* {file[0].name} ({file[0].size} bytes) */}
          <div className="hash-box">{fileBufferHash}</div>
          {/* {fileBufferHash} */}
          <Link to={`/verificationResult/${fileBufferHash}`}>
            <button className="solid-btn" style={{ marginLeft: "42%" }}>
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
