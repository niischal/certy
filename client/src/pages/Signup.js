import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div id="div">
      <div className="card my-5" id="card">
        <div className="card-header" id="card-header">
          <div className="row justify-content-center">
            <h2 id="register1">REGISTRATION FORM</h2>
          </div>
          <div className="row justify-content-center">
            <h3 id="register2">Welcome Issuer, Please login to your account</h3>
          </div>
        </div>

        <div className="row justify-content-center">
          <form className="col-lg-6">
            <div className="form-group my-3">
              <label>Institute Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="NIST College"
              />
            </div>

            <div className="form-group d-flex my-3">
              <div className="col-6 pr-2">
                <label>Issuer ID (PAN)</label>
                <input className="form-control" placeholder="423634432" />
              </div>
              <div className="col-6 pl-2">
                <label>Phone No.</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="0119432"
                />
              </div>
            </div>

            <div className="form-group my-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="info@nist.edu.np"
              />
            </div>
            <div className="form-group d-flex my-3">
              <div className="col-6 pr-2">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                />
              </div>
              <div className="col-6 pl-2">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                />
              </div>
            </div>
            <div className="text-center my-3">
              <button type="button" className="btn btn-outline-info">
                Request
              </button>
            </div>
            <hr />
            <div className="text-center my-3">
              <Link to="/">
                <p>Already Have account?Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
