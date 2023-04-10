import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import AddProgramModal from "./AddProgramModal";
import Loader from "./Loader";
import Error from "./Error";

function ProgramList() {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const[programs, setPrograms] = useState();
  const [modalState, setModalState] = useState(false);
  const [tableState, setTableState] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const userId = currentUser._id
  const changeModalState = () => {
    setModalState(!modalState);
  };
  const updateTableState = async ()=>{
    setTableState(!tableState)
  };
  useEffect(()=>{
    const fetchPrograms = async ()=>{
      setStatus(STATUS.LOADING)
      await axios
      .post('/api/issuer/getIssuerById', {userId})
      .then((res)=>{
        setStatus(STATUS.SUCCESS)
        setPrograms(res.data.programs)
      })
      .catch((err)=>{
        setStatus(STATUS.ERROR)
        console.log(err)
      })
    }
    fetchPrograms();    
  },[tableState])
  return (
    <div className="container-fluid m-5">
      <div className="row justify-content-between">
        <div className="col-auto">
          <h2>List Of Programs</h2>
        </div>
        <div className="col-auto">
          <button className="solid-btn" onClick={changeModalState}>
            <BsPlusLg style={{ scale: "0.7" }} />
            {"   "}
            Add New
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Program Name</th>
            <th>Initiation Date</th>
            <th>Completion Date</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
         {programs && programs.map((program,i)=>{
          const initiationDate = new Date(program.dateOfProgramInitiation);
          const completionDate = new Date(program.dateOfCompletion);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          i++
          return <tr key={i+1}>
            <td>{program.programName}</td>
            <td>{initiationDate.toLocaleDateString(undefined, options)}</td>
            <td>{completionDate.toLocaleDateString(undefined, options)}</td>
            {/* <td>//Actions</td> */}
          </tr>
         })}
        </tbody>
      </table>
      {status === STATUS.LOADING && <Loader/>}
      {status === STATUS.ERROR && <Error error='Something went Wrong'/>}
      {modalState ? (
        <AddProgramModal changeModalState={changeModalState} updateTableState={updateTableState}/>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProgramList;
