import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import AddProgramModal from "./AddProgramModal";

function ProgramList() {
  const [modalState, setModalState] = useState(false);
  const changeModalState = () => {
    setModalState(!modalState);
  };
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      {modalState ? (
        <AddProgramModal changeModalState={changeModalState} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProgramList;
