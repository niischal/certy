import React, { useState, useRef } from "react";

const Verify = () => {
  const [file, setFile] = useState(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files);
    console.log(file);
  };
  const inputRef = useRef();
  return (
    <>
      {!file && (
        <div
          className="col verify-box"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDoubleClick={() => inputRef.current.click()}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files)}
            hidden
            ref={inputRef}
          />
          <h1 id="p1">Drag Certificate to Verify</h1>
          <h1>or</h1>
          <h1>Double click to select</h1>
        </div>
      )}
      {file && (
        <div className="col verify-box">
          {file[0].name} ({file[0].size} bytes)
        </div>
      )}
    </>
  );
};

export default Verify;
