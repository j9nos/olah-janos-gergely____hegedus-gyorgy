import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./PatientBloodTestModal.css";
import PatientBloodTestVisualization from "./PatientBloodTestVisualization";
import API from "../utils/API";
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

  function logstuff() {
    console.log(bloodTestResults[0]);
  }
  return (
    <div className="patient-blood-test-modal">
      {props.selectedDate}
      <button onClick={closeModal}>X</button>
      <button onClick={logstuff}>log</button>
      {bloodTestResults.map((e) => {
        return (
          <PatientBloodTestVisualization
            key={e.blood_test_component_abbreviation}
            incomingData={e}
          />
        );
      })}
    </div>
  );
};
export default PatientBloodTestModal;
