import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { TiTick, TiCancel } from "react-icons/ti";

import getContractInfo from "../web3";

const IssuerRequest = () => {
  const [users, setUsers] = useState([]);
  const admin = JSON.parse(localStorage.getItem("admin"))
  const adminId = admin.adminId

  useEffect(() => {
    async function getIssuers() {
      const res = await axios.get("/api/admin/allrequest", {
        headers:{
          adminId: adminId
        }
      });
      setUsers(res.data);
    }
    getIssuers();
  }, [users]);
  //code change
  const rejectIssuerRequest = async (issuerId, address) => {
    console.log("delete id:", issuerId);
    await axios
    .post("/api/admin/rejectIssuerRequest", {issuerId},{
      headers: {
        adminId: adminId
      }
    })
  }

  const acceptIssuerRequest = async (issuerId, address) => {
    console.log("issuerId", issuerId);
    await axios
      .post("/api/admin/acceptIssuerRequest ", { issuerId }, {
        headers: {
          adminId: adminId
        }
      })
      .then(async (res) => {
        const contract = await getContractInfo();
        if (!contract.loading) {
          console.log("contract", contract);
          await contract.contract.methods
            .addIssuer(address, issuerId.toString())
            .send({ from: "0x855151B12fFa8189b406356D1CB7f0ae59834519" });
        }
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
                      onClick={() => acceptIssuerRequest(e._id, e.address)}
                    >
                      <TiTick />
                      Accept
                    </button>{" "}
                    <button
                      className="reject-btn mx-auto"
                      onClick={() => rejectIssuerRequest(e._id, e.address)}
                    >
                      <TiCancel/>
                      Reject
                    </button>
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
