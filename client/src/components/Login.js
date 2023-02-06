import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {FaEye, FaEyeSlash} from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="col" id="login">
      <h2 id="p2">CERTY</h2>
      <p>Welcome Issuer, Please login to your account</p>
      <form>
        <ul className="ulclass">
          <li >Email</li>
          <li>
            <input type="text" placeholder="Email" id="input-field"/>
          </li>
          <li>Password</li>
          <li className="password-toggle-icon-list">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="input-field"
            />
            <span 
              className="password-toggle-icon" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye/>  : <FaEyeSlash/>}
            </span>
          </li>
        </ul>
        <ul className="ulclass">
          <input type="checkbox"/>
          <label>Remember me</label>
          <label className="fclass">
            <a href="http://localhost:3000/">Forgot password?</a>
          </label>
        </ul>
        <ul className="ulclass">
          <li>
            <Link to="/admin" id="loginlink">
              <button id="lbutton">Login</button>
            </Link>
            <Link to="/signup">
              <button id="rbutton"className="rclass">Request</button>
            </Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default Login;
