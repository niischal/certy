import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { TiTick } from "react-icons/ti";

const IssuerRequest = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getIssuers() {
      const res = await axios.get("/api/issuer/allrequest");
      setUsers(res.data);
    }
    getIssuers();
  }, [users]);

  const acceptIssuerRequest = async (issuerId) => {
    console.log("issuerId", issuerId);
    await axios
      .post("/api/admin/acceptIssuerRequest ", { issuerId })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h3>Request List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Issuer Name</th>
            <th>Issuer ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Pending Request</th>
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
                  <td>
                    {" "}
                    <button
                      className="solid-btn mx-auto"
                      onClick={() => acceptIssuerRequest(e._id)}
                    >
                      <TiTick />
                      Accept
                    </button>{" "}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No any pending request!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssuerRequest;
