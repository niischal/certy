import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Navigate, Route, Routes } from "react-router";
import IssuerHome from "../components/IssuerHome";
import ProgramList from "../components/ProgramList";
import IssueCertificate from "../components/IssueCertificate";

const CertyIssuer = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <Navbar name="Issuer" />
      <div className="main-container" style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={user ? <ProgramList /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/"
            element={user ? <ProgramList /> : <Navigate to="/" />}
          />
          <Route
            path="/programList"
            element={user ? <ProgramList /> : <Navigate to="/" />}
          />
          <Route
            path="/issueCertificate"
            element={user ? <IssueCertificate /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
};

export default CertyIssuer;
