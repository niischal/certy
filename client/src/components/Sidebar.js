import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaUser, FaReadme, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import IssuerList from "../components/IssuerList";
import IssuerRequest from "../components/IssuerRequest";

const routes = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/issuer",
    name: "Add_Issuer",
    icon: <FaUser />,
  },
  {
    path: "/admin",
    name: "Issuer_Details",
    icon: <FaReadme />,
  },
];

const Sidebar = ({ children }) => {
  const [showIssuerList, setShowIssuerList] = useState(false);
  const handleIssuerListClick = () => setShowIssuerList(!showIssuerList);
  const [showRequest, setShowRequest] = useState(false);
  const handleIssuerRequest = () => setShowRequest(!showRequest);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="main-container" style={{display:"flex"}}>
      <motion.div
        animate={{ width: isOpen ? "200px" : "37px" }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && <h1 className="logo">ADMIN</h1>}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

       <section className="routes">
          {routes.map((route) => (
            <NavLink to={route.path} key={route.name} className="link">
              <div className="icon">
                {route.name === "Issuer_Details"
                  ? <FaReadme onClick={handleIssuerListClick} />
                  :route.name === "Add_Issuer"
                  ? <FaUser onClick={handleIssuerRequest}/>
                  : route.icon
                }
              </div>
              
              <div className="link_text">{route.name}</div>
            </NavLink>
          ))}
        </section>

      </motion.div>
      <main>
        {children}
       {showIssuerList && <IssuerList />}
       {showRequest && <IssuerRequest />}
      </main>
    </div>
  );
};

export default Sidebar;
