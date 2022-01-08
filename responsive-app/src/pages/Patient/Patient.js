import React, { useState } from "react";
import PatientSidebar from "../../components/PatientSidebar";

import Profile from "./Profile";
import BloodTest from "./BloodTest";
import Appointment from "./Appointment";
import Medication from "./Medication";
import Settings from "./Settings";
import { removeToken } from "../../utils/authorization";

import "./Patient.css";

const Patient = () => {
  const [page, setPage] = useState("profile");
  function renderProfile() {
    setPage("profile");
  }
  function renderBloodtest() {
    setPage("blood-test");
  }
  function renderAppointment() {
    setPage("appointment");
  }
  function renderMedication() {
    setPage("medication");
  }
  function renderSettings() {
    setPage("settings");
  }
  function logout() {
    removeToken();
    window.location.reload();
  }
  return (
    <>
      <PatientSidebar
        handleRenderProfile={renderProfile}
        handleRenderBloodtest={renderBloodtest}
        handleRenderAppointment={renderAppointment}
        handleRenderMedication={renderMedication}
        handleRenderSettings={renderSettings}
        handleLogout={logout}
      />
      {page === "profile" ? (
        <Profile key={1} />
      ) : (
        [
          page === "blood-test" ? (
            <BloodTest key={2} />
          ) : (
            [
              page === "appointment" ? (
                <Appointment key={3} />
              ) : (
                [
                  page === "medication" ? (
                    <Medication key={4} />
                  ) : (
                    [page === "settings" ? <Settings key={5} /> : null]
                  ),
                ]
              ),
            ]
          ),
        ]
      )}
    </>
  );
};
export default Patient;
