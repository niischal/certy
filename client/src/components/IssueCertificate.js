import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function IssueCertificate() {
  return (
    <div className="mb-3" style={{ marginLeft: "2rem" }}>
      <h3 className="mb-3">IssueCertificate</h3>
      <div className="card justify-content-center p-3">
        <div className="row">
          <div className="col-6 p-2">
            <label>CID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Certificate ID"
            />
          </div>
          <div className="col-6 p-2">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6 p-2">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <div className="col-6 p-2">
            <label>Program Name</label>

            <select className="form-select ">
              <option value="">Select Program.....</option>
              <option value="1">BCA</option>
              <option value="2">CSIT</option>
              <option value="3">BIM</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-6 p-2">
            <label>Issued Date</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-6 p-2">
            <label>Document</label>
            <input type="file" className="form-control-file" />
          </div>
          <div className="btn btn-info">Issue Certificate</div>
        </div>
      </div>
    </div>
  );
}

export default IssueCertificate;
