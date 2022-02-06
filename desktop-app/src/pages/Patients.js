import React from "react";
import Button from "../components/Button";
import ModalData from "../components/ModalData";
import "./Patients.css";

function Patients() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  return (
    <div className="patients">
      <div className="patients-page">
        <div className="patients-top-container">
          <div className="patients-top-left"></div>
          <div className="patients-top-right">
            <button className="NewPatientBtn">Uj felvetel</button>
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
                <tr>
                  <td>Hegedus Gyorgy Karoly</td>
                  <td>Ferfi</td>
                  <td>111111111</td>
                  <td>2022.12.12</td>
                  <td>2750 Miskolc Tapolca Lencses Vilagos dulo 4</td>
                  <td>06301234545</td>
                  <td>ezegynagyonhosszudetenylegnagyonhosszu@emailcimlesz.hu</td>
                  <td>
                    <ModalData/>
                  </td>
                </tr>
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
