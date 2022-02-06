import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./PatientBloodTestModal.css";
import PatientBloodTestVisualization from "./PatientBloodTestVisualization";

import API from "../../../utils/API";
import { BiMinusCircle } from "react-icons/bi";

const PatientBloodTestModal = (props) => {
  useEffect(() => {
    API.post("/patientBloodTestResults", { date: props.selectedDate }).then(
      (result) => setBloodTestResults(result.data)
    );
  }, []);
  const [bloodTestResults, setBloodTestResults] = useState([]);

  function closeModal() {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("patientBloodTestModal")
    );
  }
  return (
    <div className="patient-blood-test-modal">
      <div className="patient-blood-test-modal-bar">
        <button onClick={closeModal} className="patient-blood-test-modal-quit">
          <BiMinusCircle />
        </button>
        <p>{props.selectedDate}</p>
      </div>

      <div className="patient-blood-test-blood-test-container">
        {bloodTestResults.map((e) => {
          return (
            <PatientBloodTestVisualization
              key={e.blood_test_component_abbreviation}
              incomingData={e}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PatientBloodTestModal;
