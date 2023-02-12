import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "../components/Login";
import Verify from "../components/Verify";

const Home = () => {
  return (
    <div id="div">
      <div className="container home-card">
        <div className="row ">
          <Login />
          <Verify />
        </div>
      </div>
    </div>
  );
};

export default Home;
