import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";

const routes = AdminRoutes;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [active, setActive] = useState(1);

  const checkActive = (id) => {
    return id === active ? "link active" : "link";
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
              className={checkActive(route.id)}
              onClick={() => setActive(route.id)}
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
