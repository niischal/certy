import "./App.css";
import Home from "./pages/Home";
import CertyAdmin from "./pages/CertyAdmin";
import CertyIssuer from "./pages/CertyIssuer";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import VerifyResult from "./pages/VerifyResult";

function App() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to='/issuer'/>} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<CertyAdmin />} />
        <Route path="/issuer" element={user ? <CertyIssuer />: <Navigate to='/'/>} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/issuer'/>} />
        <Route path="/verificationResult/:cid" element={<VerifyResult />} />
      </Routes>
    </Router>
  );
}

export default App;
