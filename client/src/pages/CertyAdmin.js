import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import IssuerList from "../components/IssuerList";
import { Navigate, Route, Routes } from "react-router";
import AdminHome from "../components/AdminHome";
import IssuerRequest from "../components/IssuerRequest";

const CertyAdmin = () => {
  const admin = JSON.parse(localStorage.getItem("admin"))
  return (
    <>
      <Navbar name="Admin" />
      <div className="main-container" style={{ display: "flex" }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={admin ? <AdminHome /> : <Navigate to='/'/>} />
          <Route exact path="/" element={admin ? <AdminHome /> : <Navigate to='/'/>} />
          <Route path="/issuerList" element={admin ? <IssuerList />: <Navigate to='/'/>} />
          <Route path="/issuerRequest" element={admin? <IssuerRequest />: <Navigate to='/'/>} />
        </Routes>
      </div>
    </>
  );
};

export default CertyAdmin;
