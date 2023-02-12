import React, { useState } from "react";
import { motion } from "framer-motion";

import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";

const routes = AdminRoutes;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const checkActive = (route) => {
    return location.pathname === route.path ? "link active" : "link";
  };
  return (
    <>
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
