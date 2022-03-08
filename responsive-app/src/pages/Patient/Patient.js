import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { logout, reloadOnExpiration } from "../../utils/authorization";

import "./patient.css";
import API from "../../utils/API";

import SIDEBAR from "../../components/sidebar/SIDEBAR";
import FOOTER from "../../components/footer/FOOTER";
import BLOODTEST from "../patient/bloodtest/BLOODTEST";
import HOME from "./home/HOME";
import SETTING from "./setting/SETTING";

const PATIENT = () => {
  useEffect(() => {
    API.get("/patient-profile-data").then((result) =>
      setPatientData(result.data)
    );
    const interval = setInterval(() => {
      reloadOnExpiration();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const [patientData, setPatientData] = useState([]);

  const [selectedDate, setSelectedDate] = useState();

  function selectDate(date) {
    setSelectedDate(date);
  }

  function openSettings() {
    ReactDOM.render(<SETTING />, document.getElementById("settings"));
  }

  return (
    <>
      <SIDEBAR onDateClicked={selectDate} />
      <FOOTER
        onClickLogout={logout}
        onClickOpenSettings={openSettings}
        patientData={patientData}
      />
      {selectedDate ? <BLOODTEST date={selectedDate} /> : <HOME />}
    </>
  );
};
export default PATIENT;
