import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle } from "react-icons/fa";

const VerifiedBadge = () => (
  <div className="my-badge">
    <FaCheckCircle style={{ marginRight: 5 }} />
    Certificate Verified!
  </div>
);

const VerifyResult = () => (
  <div className="container-rounded mx-auto p-4">
    <div className="upper-part p-2">
      <h4 className="mb-0">Hari Sharan Chaulagain</h4>
      <div className="verified-section">
        <VerifiedBadge />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6 p-2">
        <label>
          <strong>Program: </strong>
          BSc.CSIT
        </label>
      </div>
      <div className="col-md-6 p-2">
        <label>
          <strong>Verified By: </strong>
          NIST College, Banepa
        </label>
      </div>
      <div className="col-md-6 p-2">
        <label>
          <strong>Start Date: </strong>
          12 July, 2019
        </label>
      </div>
      <div className="col-md-6 p-2">
        <label>
          <strong>Completion Date: </strong>
          20 April, 2023
        </label>
      </div>
      <div className="col-md-6 p-2">
        <label>
          <strong>Issued Date: </strong>
          10 Jun, 2023
        </label>
      </div>
    </div>
    <hr />
    <div className="lower-part text-center">
      <h5>@CERTY</h5>
      <p style={{ fontSize: "12px" }}>
        Decentralized Certificate Verification Using SHA-256 Algorithm
      </p>
    </div>
  </div>
);

export default VerifyResult;
