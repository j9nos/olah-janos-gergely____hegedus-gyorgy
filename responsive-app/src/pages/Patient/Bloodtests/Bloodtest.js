import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import API from "../../../utils/API";

import PatientBloodTestModal from "./PatientBloodTestModal";

import "./Bloodtest.css";

const BloodTest = () => {
  useEffect(() => {
    API.get("/patient-bloodtest-dates").then((result) =>
      setBloodTestsDate(result.data)
    );
  }, []);
  const [bloodTestsDate, setBloodTestsDate] = useState([]);

  function renderBloodtestModal(selectedDate) {
    ReactDOM.render(
      <PatientBloodTestModal selectedDate={selectedDate} />,
      document.getElementById("patientBloodTestModal")
    );
  }
  return (
    <div className="patient-page-container">
      <h1 className="patient-page-title">Vérvételek</h1>
      <div className="patient-dates">
        {bloodTestsDate.map((date) => {
          return (
            <button className="date-button"
              key={date.blood_tests_taken_date}
              onClick={() => {
                renderBloodtestModal(date.blood_tests_taken_date.split("T")[0]);
              }}
            >
              {date.blood_tests_taken_date.split("T")[0] }
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default BloodTest;
