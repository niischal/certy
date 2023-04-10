import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WalletConnect from "./WalletConnect";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const loginUser = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    if (!email || !password) {
      setStatus(STATUS.ERROR);
      return;
    }
    try {
      axios
        .post("/api/issuer/issuerLogin", {
          email,
          password,
        })
        .then((res) => {
          console.log("res.data", res.data);
          const data = res.data;
          if (!data) {
            setStatus(STATUS.ERROR);
          } else {
            console.log("data", data.email);
            setStatus(STATUS.SUCCESS);
            navigate("/issuer");
            localStorage.setItem("currentUser", JSON.stringify(data));
            window.location.reload()
          }
        });
    } catch (error) {
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className="col i-login">
      <h2 id="p2">CERTY</h2>
      <p>Welcome Issuer, Please login to your account</p>
      <form>
        <ul className="ulclass">
          <li>Email</li>
          <li>
            <input
              type="text"
              placeholder="Email"
              id="input-field1"
              className="form-control"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>Password</li>
          <li className="password-toggle-icon-list">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="input-field2"
              className="form-control"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </li>
        </ul>
        {/* <ul className="ulclass">
          <input type="checkbox" />
          <label>Remember me</label>
          <label className="fclass">
            <a href="http://localhost:3000/">Forgot password?</a>
          </label>
        </ul> */}
        <WalletConnect address={address} setAddress={setAddress} />
        <ul className="ulclass">
          <li>
            <Link id="loginlink">
              <button className="lbutton" onClick={loginUser}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="rbutton rclass">Request</button>
            </Link>
            {status === STATUS.LOADING && <Loader />}
            {status === STATUS.SUCCESS && (
              <Success success="Login Succesfully" />
            )}
            {status === STATUS.ERROR && <Error error="Invalid Credentials" />}
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Login;
