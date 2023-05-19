import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";

function AdminLogin() {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminLoginDetails, setAdminLoginDetails] = useState({
    username: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    setAdminLoginDetails({
      ...adminLoginDetails,
      address: address,
    });
  }, [address]);

  const loginAdmin = async (e) => {
    e.preventDefault();
    setStatus(STATUS.LOADING);
    if (!adminLoginDetails.username || !adminLoginDetails.password) {
      setStatus(STATUS.ERROR);
      setMsg("Username or password is empty");
      return;
    }
    if (!adminLoginDetails.address) {
      setStatus(STATUS.ERROR);
      setMsg("Wallet not connected");
      return;
    }

    await axios
      .post("/api/admin/adminLogin", { adminLoginDetails })
      .then((res) => {
        const data = res.data;
        if (!data) {
          setStatus(STATUS.ERROR);
        } else {
          setStatus(STATUS.SUCCESS);
          navigate("/admin");
          localStorage.setItem("admin", JSON.stringify(data));
          window.location.href = "/admin";
        }
      })
      .catch((err) => {
        setStatus(STATUS.ERROR);
        setMsg(err.response.data.msg);
      });
  };
  return (
    <>
      <div id="div" className="container-fluid text-center ">
        <div className="row align-items-center justify-content-center">
          <div className="col-4 m-5 p-3 " id="login">
            <h2 id="p2">CERTY</h2>
            <p>Welcome Admin, Please login to your account</p>
            <form>
              <div className="row form-group text-start justify-content-center py-2">
                <div className="col-8">
                  <label htmlFor="username" className="form-label ">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required
                    onChange={(e) =>
                      setAdminLoginDetails({
                        ...adminLoginDetails,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row form-group py-2 text-start justify-content-center">
                <div className="col-8 " style={{ position: "relative" }}>
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setAdminLoginDetails({
                        ...adminLoginDetails,
                        password: e.target.value,
                      })
                    }
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "70%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              <div className="row ">
                <div className="">
                  <WalletConnect address={address} setAddress={setAddress} />
                </div>
              </div>
              <div className="mt-3">
                {status === STATUS.LOADING && <Loader />}
                {status === STATUS.SUCCESS && (
                  <Success success="Login Succesfully" />
                )}
                {status === STATUS.ERROR && <Error error={msg} />}
              </div>
              <button
                type="submit"
                className="solid-btn col-3 my-2"
                onClick={loginAdmin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
