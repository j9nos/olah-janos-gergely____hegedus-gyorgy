import React, { useState } from "react";
import PatientSidebar from "../../components/PatientSidebar";

import Profile from "./Profile";
import Bloodtest from "./Bloodtests/Bloodtest";
import Settings from "./Settings";
import { removeToken } from "../../utils/authorization";

import "./Patient.css";

const Patient = () => {
  const [page, setPage] = useState("profile");
  function renderProfile() {
    setPage("profile");
  }
  function renderBloodtest() {
    setPage("bloodtests");
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
        handleRenderSettings={renderSettings}
        handleLogout={logout}
      />
      {page === "profile" ? (
        <Profile />
      ) : page === "bloodtests" ? (
        <Bloodtest />
      ) : page === "settings" ? (
        <Settings />
      ) : null}
    </>
  );
};
export default Patient;
