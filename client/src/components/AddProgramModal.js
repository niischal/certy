import React, { useState } from "react";
import axios from "axios";

function AddProgramModal({ changeModalState }) {
  const initialState = {
    programName: "",
    initiationDate: "",
    completionDate: "",
  };
  const [programDetails, setProgramDetails] = useState(initialState);

  const handleAddProgram = (e) => {
    e.preventDefault();
    if( programDetails.initiationDate <= programDetails.completionDate ){
      const currentUserId = localStorage.getItem()
      const newProgram = {programDetails};
      axios
        .post('/api/issuer/addProgram', newProgram)
        .then((res)=>{
          console.log(res)
          window.location.href ='/'
        })
        .catch((err)=>{
          console.log("Something went wrong.", err)
        })
      console.log("New Program",newProgram)
      console.log("Program Successfully Added");
    }
    else{
      console.log("Invalid Input")
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Add Program</h5>
              <button
                type="button"
                className="btn-close"
                onClick={changeModalState}
              ></button>
            </div>
            <form onSubmit={handleAddProgram}>
              <div className="modal-body ">
                <div className="row">
                  <div className="col-12 ">
                    <label className="col-form-label">Program Name: </label>
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      value={programDetails.programName}
                      onChange={(e) =>
                        setProgramDetails({
                          ...programDetails,
                          programName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label className="col-form-label">
                      Date of Initiation:{" "}
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="col-form-label">
                      Date of Completion:{" "}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      value={programDetails.initiationDate}
                      type="Date"
                      className="form-control"
                      onChange={(e) =>
                        setProgramDetails({
                          ...programDetails,
                          initiationDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="Date"
                      className="form-control"
                      value={programDetails.completionDate}
                      onChange={(e) =>
                        setProgramDetails({
                          ...programDetails,
                          completionDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={changeModalState}
                >
                  Close
                </button>
                <button type="submit" className="solid-btn">
                  Add Program
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProgramModal;
