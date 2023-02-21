import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [adminLoginDetails, setAdminLoginDetails] = useState({
    username: "",
    password: "",
  });

  const loginAdmin = (e) => {
    e.preventDefault();
    console.log("adminLoginDetails", adminLoginDetails);
    setStatus(STATUS.LOADING);
    if (!adminLoginDetails.username || !adminLoginDetails.password) {
      setStatus(STATUS.ERROR);
      return;
    }
    try {
      axios.post("/api/admin/adminLogin", { adminLoginDetails }).then((res) => {
        const data = res.data;
        if (!data) {
          setStatus(STATUS.ERROR);
        } else {
          setStatus(STATUS.SUCCESS);
          console.log("data", data);
          console.log(status);
          navigate("/admin");
        }
      });
    } catch {
      setStatus(STATUS.ERROR);
      console.log("status", status);
    }
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
                <div className="col-8 ">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="********"
                    required
                    onChange={(e) =>
                      setAdminLoginDetails({
                        ...adminLoginDetails,
                        password: e.target.value,
                      })
                    }
                  />
                  <span
                    // className="password-toggle-icons"
                    className="position-absolute translate-middle" style={{ left: "58%", top: "57%" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
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
