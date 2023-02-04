import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import {FaEye, FaEyeSlash} from "react-icons/fa";



const Signup = () => {
const[showPassword, setShowPassword] = useState();
  const STATUS = Object.freeze({
    IDLE:'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  })
  const [name, setName] = useState("");
  const [issuerId, setIssuerId] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [formStatus, setFormStatus] = useState(STATUS.IDLE);

  const register = (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const newUser = {
        name: name,
        issuerId: issuerId,
        phoneNo: phoneNo,
        email: email,
        password: password,
        address: 'blockaddress'
      };
      setStatus(STATUS.LOADING)
      axios
        .post('/api/issuer/issuerRegistrationRequest', newUser).then(res=>{
          setStatus(STATUS.SUCCESS)
          console.log(res)
        }  
          )
          .catch(err=>{
            setStatus(STATUS.ERROR)
            console.log(err)
          })
      
      console.log(newUser);
    } else {
      setFormStatus(STATUS.ERROR);
    }
  };

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
          <form className="col-lg-6" onSubmit={register}>
            <div className="form-group my-3">
              <label>Institute Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="NIST College"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group d-flex my-3">
              <div className="col-6 pr-2">
                <label>Issuer ID (PAN)</label>
                <input
                  className="form-control"
                  placeholder="423634432"
                  value={issuerId}
                  required
                  onChange={(e) => setIssuerId(e.target.value)}
                />
              </div>
              <div className="col-6 pl-2">
                <label>Phone No.</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="0119432"
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
                placeholder="info@nist.edu.np"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group d-flex my-3">
              <div className="col-6 pr-2" style={{position:'relative', display:'inline-block'}}>
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="********"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <span 
                  className="password-toggle-icons" 
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye/>  : <FaEyeSlash/>}
                  </span>
              </div>
              <div className="col-6 pl-2" style={{position:'relative', display:'inline-block'}}>
                <label>Confirm Password</label>
                <input
                  // type="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="********"
                  value={cpassword}
                  required
                  onChange={(e) => setCpassword(e.target.value)}
                />
                  <span 
                  className="password-toggle-icons" 
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye/>  : <FaEyeSlash/>}
                  </span>
              </div>
            </div>
            <div className="text-center my-3">
              <button type="submit" className="btn btn-outline-info">
                Request
              </button>
            </div>
            {formStatus===STATUS.ERROR && (<Error error='Passwords do not match.' />)}
            {status === STATUS.LOADING && (<Loader/>)}
            {status === STATUS.SUCCESS && (<Success success='Registration Details Submitted Succesfully'/>)}
            {status === STATUS.ERROR && (<Error error='Somthing went wrong' />)}
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
