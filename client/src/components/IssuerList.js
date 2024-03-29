import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const IssuerList = () => {
  const [users, setUsers] = useState([]);
  const admin = JSON.parse(localStorage.getItem("admin"))
  const adminId = admin.adminId

  useEffect(() => {
    async function getIssuers() {
      const res = await axios.get("/api/admin/allissuers", {
        headers:{
          adminId: adminId
        }
      });
      setUsers(res.data);
    }
    getIssuers();
  }, [users]);

  return (
    <div style={{ margin: "2rem" }}>
      <h3>List of all Issuers</h3>
      <table className="table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Issuer Name</th>
            <th>Issuer ID</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.address}</td>
                  <td>{e.email}</td>
                  <td>{e.phoneNo}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Issuer Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuerList;
