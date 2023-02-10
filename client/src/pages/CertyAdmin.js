import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import IssuerList from "../components/IssuerList";
import { Route, Routes } from "react-router";
import AdminHome from "../components/AdminHome";
import IssuerRequest from "../components/IssuerRequest";
import IssueCertificate from "../components/IssueCertificate";
import ProgramList from "../components/ProgramList";

const CertyAdmin = () => {
  return (
    <>
      <Navbar name="Admin" />
      <div className="main-container" style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route exact path="/" element={<AdminHome />} />
          <Route path="/issuerList" element={<IssuerList />} />
          <Route path="/issuerRequest" element={<IssuerRequest />} />
          <Route path="/programList" element={<ProgramList />} />
          <Route path="/issueCertificate" element={<IssueCertificate />} />
        </Routes>
      </div>
    </>
  );
};

export default CertyAdmin;
