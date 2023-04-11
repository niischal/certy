import "./App.css";
import Home from "./pages/Home";
import CertyAdmin from "./pages/CertyAdmin";
import CertyIssuer from "./pages/CertyIssuer";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import VerifyResult from "./pages/VerifyResult";

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user && !admin ? (
              <Home />
            ) : (
              <Navigate to={admin ? "/admin" : "/issuer"} />
            )
          }
        />
        <Route
          path="/adminLogin"
          element={!admin && !user ? <AdminLogin /> : <Navigate to="/admin" />}
        />
        <Route
          path="/admin/*"
          element={
            admin ? (
              <CertyAdmin />
            ) : (
              <Navigate to={user ? "/issuer" : "/adminLogin"} />
            )
          }
        />
        <Route
          path="/issuer/*"
          element={
            user ? (
              <CertyIssuer />
            ) : (
              <Navigate to={admin ? "/admin" : "/issuer"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !user && !admin ? (
              <Signup />
            ) : (
              <Navigate to={admin ? "/admin" : "/login"} />
            )
          }
        />
        <Route path="/verificationResult/:cid" element={<VerifyResult />} />
      </Routes>
    </Router>
  );
}

export default App;
