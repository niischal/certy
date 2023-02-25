import React, { useState} from "react";
import Sha256 from '../Sha256';

const Verify = () => {
  const [file, setFile] = useState(null);
  //const [hash, setHash] = useState();
  const [buffer, setBuffer] = useState();

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload =()=>{
      const buffer = reader.result;
      setBuffer(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }

  };
  
  const handleFileInput =(event) =>{
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload =()=>{
      const buffer = reader.result;
      setBuffer(String.fromCharCode.apply(null, new Uint8Array(buffer)));
    }
      
  }
  const hash = Sha256.hash(buffer)
  console.log(hash)
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
          {hash}
        </div>
      )}
    </>
  );
};

export default Verify;
