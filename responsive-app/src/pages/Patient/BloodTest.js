import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import API from "../../utils/API";
import Button from "../../components/Button";
import PatientBloodTestModal from "../../components/PatientBloodTestModal";

import "./BloodTest.css";

const BloodTest = () => {
  useEffect(() => {
    API.get("/patientBloodTestDates").then((result) =>
      setBloodTestsDate(result.data)
    );
  }, []);
  const [bloodTestsDate, setBloodTestsDate] = useState([]);

  function renderBloodTestModal(selectedDate) {
    ReactDOM.render(
      <PatientBloodTestModal selectedDate={selectedDate} />,
      document.getElementById("patientBloodTestModal")
    );
  }

  return (
    <div className="patient-page-container">
      <div className="patient-content-container">
        <h1>Vérvételeid</h1>
        <div className="patient-content-date-container">
            {bloodTestsDate.map((e) => {
              return (
                <Button
                  key={e.blood_tests_taken_date}
                  onClick={() => {
                    renderBloodTestModal(
                      e.blood_tests_taken_date.split("T")[0]
                    );
                  }}
                  text={e.blood_tests_taken_date.split("T")[0]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default BloodTest;
