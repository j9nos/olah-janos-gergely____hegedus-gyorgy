import "./patient.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { logout, watchExpiration } from "../../utils/authorization";

import API from "../../utils/API";

import SIDEBAR from "../../components/sidebar/SIDEBAR";
import FOOTER from "../../components/footer/FOOTER";
import BLOODTEST from "../patient/bloodtest/BLOODTEST";
import SETTING from "./setting/SETTING";
import COMPONENT from "./bloodtest/COMPONENT";

const PATIENT = () => {
  useEffect(() => {
    API.get("/patient-profile-data").then((result) =>
      setPatientData(result.data)
    );
    watchExpiration();
  }, []);
  const [patientData, setPatientData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  function selectDate(argDate) {
    setSelectedDate(argDate);
  }

  function removeDate() {
    setSelectedDate("");
  }

  function openSettings() {
    ReactDOM.render(<SETTING />, document.getElementById("settings"));
  }

  return (
    <>
      <SIDEBAR onDateClicked={selectDate} onSnakeHeadClick={removeDate} />
      <FOOTER
        onClickLogout={logout}
        onClickOpenSettings={openSettings}
        patientData={patientData}
      />
      {selectedDate ? <BLOODTEST date={selectedDate} /> : <COMPONENT />}
    </>
  );
};
export default PATIENT;
