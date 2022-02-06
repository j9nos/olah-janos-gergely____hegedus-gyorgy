import React, { useState, useEffect } from "react";
import API from "../../utils/API";

import "./Profile.css";

const Profile = () => {
  useEffect(() => {
    API.get("/patient-profile-data").then((result) =>
      setPatientProfileData(result.data)
    );
  }, []);

  const [patientProfileData, setPatientProfileData] = useState({});

  return (
    <div className="patient-page-container">
      <h1 className="patient-page-title">Profil</h1>
      <p>{patientProfileData.patient_name}</p>
    </div>
  );
};
export default Profile;
