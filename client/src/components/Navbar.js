import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
// import logo from '../images/logo192.png';

const Navbar = (props) => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const handleLogout = () =>{
    localStorage.removeItem('currentUser')
    window.location.reload()
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow">
        <NavLink className="navbar-brand" to="/">
          <h1 className="logotitle">CERTY</h1>
        </NavLink>
        <NavLink to="/">
          <p className="logotitle1">
            DECENTRALIZED CERTIFICATE VARIFICATION APPLICATION
          </p>
          {/* <img src={logo} alt="logo" className='navbar-logo' /> */}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link">
                {" "}
                <p className="pclass">Hello, {user.name} |</p>{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/"  onClick={()=>{handleLogout()}}>
                <p className="pclass">Log Out</p>{" "}
                
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
