import React, { Fragment, useEffect, useState } from "react";
import { Table,Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const IssuerList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getIssuers() {
      const res = await axios.get("/api/issuer/allrequest");
      setUsers(res.data);
    }
    getIssuers();
  }, []);

  return (
    <Fragment>
        <div style={{margin:"2rem"}}>
        <h3>Request List</h3>
            <Table striped bordered hover size="sm">
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
                    {
                        users.length > 0 ?
                       ( users.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.address}</td>
                                    <td>{e.email}</td>
                                    <td>{e.phoneNo}</td>
                                    <td> <Button>Accept</Button> </td>
                                </tr>
                            )
                        })
                       ) : (
                        <tr>
                            <td>No any pending request!</td>
                        </tr>
                       )
                    }
                </tbody>

            </Table>

        </div>
    </Fragment>
  )
}

export default IssuerList
