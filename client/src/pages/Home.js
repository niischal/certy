import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div id="div">
        <div className="container" id="home" >
            <div className="row">
                
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
                        <li>
                            <input type="password" placeholder="Password" id="input-field"/>
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
                        <Link to="/admin" id="loginlink"> <button id="lbutton">Login</button> </Link>
                        <Link to="/signup"> <button id="rbutton"className="rclass" >Request</button> </Link>
                        </li>
                    </ul>
                </form>
                </div>
                <div className="col" id="check">
                  <h1 id="p1">Drag Certificate to Verify</h1>
                    <h1>or</h1>
                    <h1>Double click to select</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home