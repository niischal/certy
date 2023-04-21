import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Web3 from "web3";
import { BiRefresh } from "react-icons/bi";
const Signup = () => {
  const [showPassword, setShowPassword] = useState();
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [issuerId, setIssuerId] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [formStatus, setFormStatus] = useState(STATUS.IDLE);
  const [address, setAddress] = useState("");

  const register = (e) => {
    e.preventDefault();
    handleConnect();
    if (address === "") {
      setStatus(STATUS.ERROR);
      setMsg("Wallet Not Connected");
      return;
    }
    if (password === cpassword) {
      const newUser = {
        name: name,
        issuerId: issuerId,
        phoneNo: phoneNo,
        email: email,
        password: password,
        address: address,
      };
      setStatus(STATUS.LOADING);
      axios
        .post("/api/issuer/issuerRegistrationRequest", newUser)
        .then((res) => {
          setStatus(STATUS.SUCCESS);
          console.log(res);
          window.location.href = "/";
        })
        .catch((err) => {
          setStatus(STATUS.ERROR);
          setMsg(err.response.data.message);
        });
    } else {
      setFormStatus(STATUS.ERROR);
    }
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(acc[0]);
    } else if (window.web3) {
      const web3 = new Web3(window.ethereum.currentProvider);
      await window.ethereum.enable();
      const acc = await web3.eth.getAccounts();
      setAddress(acc[0]);
    } else {
      console.log("No Ethereum Browser");
    }
  };
  return (
    <div id="div" className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-6 m-3">
          <div className="card-head">
            <div className="row justify-content-center mt-3">
              <h2 id="register1">REGISTRATION FORM</h2>
            </div>

            <div className="row justify-content-center">
              <h3 id="register2">
                Welcome Issuer, Please login to your account
              </h3>
            </div>
            <div className="row justify-content-center">
              <>Please Check Your Wallet Address</>
            </div>
          </div>
          <div className="r-card-body">
            <div className="row justify-content-center">
              <form className="col-10" onSubmit={register}>
                <div className="form-group my-3">
                  <label>Institute Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Institute Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group d-flex my-3 justify-content-between">
                  <div className="col-5 ">
                    <label>Issuer ID (PAN)</label>
                    <input
                      className="form-control"
                      placeholder="Permanent Account Number"
                      value={issuerId}
                      required
                      onChange={(e) => setIssuerId(e.target.value)}
                    />
                  </div>
                  <div className="col-5 ">
                    <label>Phone No.</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      value={phoneNo}
                      required
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group my-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex my-3 justify-content-between">
                  <div
                    className="col-5"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <label>Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="password-toggle-icons"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div
                    className="col-5"
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <label>Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      value={cpassword}
                      required
                      onChange={(e) => setCpassword(e.target.value)}
                    />
                    <span
                      className="password-toggle-icons"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-12 text-center">
                    {address === "" ? (
                      <div>
                        Wallet Not Connected &nbsp;
                        <BiRefresh
                          className="refresh-icon"
                          onClick={handleConnect}
                        />
                      </div>
                    ) : (
                      <div>
                        Wallet Address: <b>{address}</b> &nbsp;
                        <BiRefresh
                          className="refresh-icon"
                          onClick={handleConnect}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center my-3">
                  <button type="submit" className="rbutton">
                    Request
                  </button>
                </div>
                {formStatus === STATUS.ERROR && (
                  <Error error="Passwords do not match." />
                )}
                {status === STATUS.LOADING && <Loader />}
                {status === STATUS.SUCCESS && (
                  <Success success="Registration Details Submitted Succesfully" />
                )}
                {status === STATUS.ERROR && <Error error={msg} />}
                <hr />
                <div className="text-center">
                  <Link to="/" className="simple-link">
                    <p>Already Have account?</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
