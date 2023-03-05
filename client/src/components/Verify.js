import React, { useState} from "react";
import Sha256 from '../Sha256';
import FileBuffer from "../FIleBuffer";

const Verify = () => {
  const [file, setFile] = useState(null);
  //const [hash, setHash] = useState();
  const [fileBufferHash, setFileBufferHash] = useState();


  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);

  };
  const handleFileInput =(event) =>{
    const file = event.target.files[0];
    setFile(file);
  }
  const BufferString = async()=>{
    try {
      const fileBuffer = await FileBuffer.buffer(file);
      const hash = Sha256.hash(fileBuffer);
      setFileBufferHash(hash);
    } catch (error) {
      console.error(error);
    }
  }
  if(file){
    BufferString();
  }
  return (
    <>
      {!file && (
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
          <h1 id="p1">Drag Certificate to Verify</h1>
          <h1>or</h1>
          <h1>Double click to select</h1>
        </div>
      )}
      {file && (
        <div className="col verify-box">
          {/* {file[0].name} ({file[0].size} bytes) */}
          {fileBufferHash}
        </div>
      )}
    </>
  );
};

export default Verify;
