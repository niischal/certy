import "./App.css";
import Home from "./pages/Home";
import CertyAdmin from "./pages/CertyAdmin";
import CertyIssuer from "./pages/CertyIssuer";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import VerifyResult from "./pages/VerifyResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<CertyAdmin />} />
        <Route path="/issuer" element={<CertyIssuer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verificationResult/:cid" element={<VerifyResult />} />
      </Routes>
    </Router>
  );
}

export default App;
