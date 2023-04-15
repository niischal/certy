import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { TiTick, TiCancel } from "react-icons/ti";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import getContractInfo from "../web3";
import WalletConnect from "./WalletConnect";

const IssuerRequest = () => {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [adminAddress, setAdminAddress] = useState();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const adminId = admin.adminId;

  useEffect(() => {
    async function getIssuers() {
      setStatus(STATUS.LOADING);
      const res = await axios.get("/api/admin/allrequest", {
        headers: {
          adminId: adminId,
        },
      });
      setUsers(res.data);
    }
    getIssuers();
    if (users.length > 0) {
      setStatus(STATUS.IDLE);
    }
  }, [users]);
  //code change
  const rejectIssuerRequest = async (issuerId, address) => {
    console.log("delete id:", issuerId);
    if (admin.adminAddress === adminAddress) {
      await axios
        .post(
          "/api/admin/rejectIssuerRequest",
          { issuerId },
          {
            headers: {
              adminId: adminId,
            },
          }
        )
        .then((res) => {
          setStatus(STATUS.SUCCESS);
          setMsg(res.data.msg);
        })
        .catch((err) => {
          setStatus(STATUS.ERROR);
          setMsg(err.response.data.msg);
        });
    } else {
      setStatus(STATUS.ERROR);
      setMsg("Wallet Address Does not Match");
    }
  };

  const acceptIssuerRequest = async (issuerId, address) => {
    console.log("issuerId", issuerId);
    const contract = await getContractInfo();
    if (admin.adminAddress !== adminAddress) {
      setStatus(STATUS.ERROR);
      setMsg("Wallet Address Does not Match");
      return;
    }
    if (!contract.loading) {
      console.log("contract", contract);
      await contract.contract.methods
        .addIssuer(address, issuerId.toString())
        .send({ from: adminAddress })
        .then(async (res) => {
          await axios
            .post(
              "/api/admin/acceptIssuerRequest ",
              { issuerId, adminAddress },
              {
                headers: {
                  adminId: adminId,
                },
              }
            )
            .then((res) => {
              setStatus(STATUS.SUCCESS);
              setMsg("Request Accepted");
            })
            .catch((err) => {
              setStatus(STATUS.ERROR);
              setMsg(err.response.data.msg);
            });
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <div className="row">
        <h3 className="col-4">Request List</h3>
        <div className="col-8">
          <WalletConnect address={adminAddress} setAddress={setAdminAddress} />
        </div>
      </div>
      <div>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.SUCCESS && <Success success={msg} />}
        {status === STATUS.ERROR && <Error error={msg} />}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Issuer Name</th>
            <th>Issuer Address</th>
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
                      <TiCancel />
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
