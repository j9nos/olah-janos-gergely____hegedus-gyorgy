import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import "./Profile.css";


const Profile = () => {
  useEffect(() => {
    API.get("/basicPatientData").then((result) =>
      setBasicPatientData(result.data)
    );
  }, []);

  const [basicPatientData, setBasicPatientData] = useState({});

  return (
    <div className="patient-page-container">
      <div className="patient-profile">
        <h1 className="patient-profile-name">
          Üdvözlünk, {basicPatientData.patient_name}
        </h1>
        <div className="patient-profile-content">
        </div>
      </div>
    </div>
  );
};
export default Profile;
