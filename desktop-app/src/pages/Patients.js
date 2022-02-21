import React, { useState } from "react";
import Button from "../components/Button";
import ModalData from "../components/ModalData";
import API from "../utils/API";
import "./Patients.css";



function Patients() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];

  const [patients, setPatients] = useState([]);
  API.get("/patients").then((result) =>
  setPatients(result.data)
  
);
  function show(){
    console.log(patients);
  }

  return (
    <div className="patients">
      <div className="patients-page">
        <div className="patients-top-container">
          <div className="patients-top-left"></div>
          <div className="patients-top-right">
            <button onClick = {show} className="NewPatientBtn">Uj felvetel</button>
            <select name="cars" className="blood-selection">
              <option value="Valassz vertipust">Valassz vertipust</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="B+">B+</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
              <option value="B-">B-</option>
              <option value="B+">B+</option>
              <option value="0-">0-</option>
              <option value="0+">0+</option>
            </select>
            <input placeholder="Kereses" />
          </div>
        </div>
        <div className="patients-mid-container">
          <div className="patients-left"></div>
          <div className="patients-table-container">
            <table>
              <thead>
                <tr>
                  <th>Vercsoport</th>
                  <th>Név</th>
                  <th>Nem</th>
                  <th>Taj</th>
                  <th>Születési idő</th>
                  <th>Lakcim</th>
                  <th>Telefonszám</th>
                  <th>Emailcim</th>
                  <th>Adatok</th>
                </tr>
              </thead>
              <tbody>
              {patients.map((patient, index) => {
                  return (
                    <tr key={index}>
                      <td>{patient.patient_blood_type}</td>
                      <td>{patient.patient_name}</td>
                      <td>{patient.patient_gender}</td>
                      <td>{patient.patient_taj}</td>
                      <td>{patient.patient_birthdate.split("T")[0]}</td>
                      <td>{patient.patient_address}</td>
                      <td>{patient.patient_phone}</td>
                      <td>{patient.patient_email}</td>
                      <td><ModalData/></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="patients-right"></div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
