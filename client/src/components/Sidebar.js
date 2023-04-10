import React, { useState } from "react";
import { motion } from "framer-motion";

import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import IssuerRoutes from "./IssuerRoutes";


let routes = [];
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  
  const checkActive = (route) => {
    return location.pathname === route.path ? "link active" : "link";
  };
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const admin = JSON.parse(localStorage.getItem("admin"))
  if(admin){
    routes = AdminRoutes
  }
  if(user){
    routes = IssuerRoutes
  }
  return (
    <>
      <motion.div
        animate={{ width: isOpen ? "200px" : "37px" }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && <h1 className="logo">{admin? 'ADMIN': 'ISSUER'}</h1>}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {routes && routes.map((route) => (
            <Link
              to={route.path}
              key={route.name}
              className={checkActive(route)}
            >
              <div className="icon">{route.icon}</div>
              {isOpen ? <div className="link_text">{route.name}</div> : <></>}
            </Link>
          ))}
        </section>
      </motion.div>
    </>
  );
};

export default Sidebar;
