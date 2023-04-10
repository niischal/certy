import React, { useState } from "react";
import axios from "axios";
import Error from "./Error";
import Loader from "./Loader";
import Success from "./Success";

function AddProgramModal({ changeModalState, updateTableState }) {
  const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [formStatus, setFormStatus] = useState(STATUS.IDLE);
  const initialState = {
    programName: "",
    initiationDate: "",
    completionDate: "",
  };
  const [programDetails, setProgramDetails] = useState(initialState);

  const handleAddProgram = (e) => {
    e.preventDefault();
    if( programDetails.initiationDate <= programDetails.completionDate ){
      setFormStatus(STATUS.SUCCESS)
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const newProgram = {currentUser,programDetails};
      setStatus(STATUS.LOADING)
      axios
        .post("/api/issuer/addProgram", newProgram)
        .then((res) => {
          setStatus(STATUS.SUCCESS);
          console.log(res);
          setProgramDetails(initialState);
          updateTableState()
        })
        .catch((err) => {
          setStatus(STATUS.ERROR);
          console.log("Something went wrong.", err);
        });
    } else {
      setFormStatus(STATUS.ERROR);
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
            {formStatus === STATUS.ERROR && (
              <Error error="Completion Date is Earlier than Program Initiation." />
            )}
            {status === STATUS.LOADING && <Loader />}
            {status === STATUS.SUCCESS && (
              <Success success="Your Program has been Added Successfully" />
            )}
            {status === STATUS.ERROR && <Error error="Somthing went wrong" />}
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
              <label style={{marginLeft:"20px"}}>
              <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                Please read all the details carefully before checking the checkbox.
              </label>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={changeModalState}
                >
                  Close
                </button>
                <button type="submit" className="solid-btn" disabled={!isChecked}>
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
