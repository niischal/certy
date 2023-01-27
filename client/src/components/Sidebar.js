import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {FaHome, FaUser,FaReadme, FaBars} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const routes = [
    {
        path:"/admin",
        name:"Dashboard",
        icon:<FaHome/>,
    },
    {
        path:"/issuer", 
        name:"Add_Issuer",
        icon:<FaUser/>,
    },
    {
        path:"/users",
        name:"Issuer_Details",
        icon:<FaReadme/>,
    }
]


const Sidebar = ({ children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="main-container">
        <motion.div animate={{width: isOpen ? "200px" : "37px"}} className="sidebar">

        <div className="top_section">
           {isOpen &&  <h1 className="logo">ADMIN</h1>}
           <div className="bars">
              <FaBars onClick={toggle} />
            </div>
        </div>

            <section className="routes">
                {routes.map((route) => (
                    <NavLink to={route.path} key={route.name} className="link">
                        <div className="icon">
                            {route.icon}
                        </div>
                        <div className="link_text">
                            {route.name}
                        </div>
                    </NavLink>
                ))}

            </section>
        </motion.div>
        <main>{children}</main>
    </div>
  )
}

export default Sidebar
