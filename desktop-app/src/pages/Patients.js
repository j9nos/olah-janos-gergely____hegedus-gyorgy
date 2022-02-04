import React from "react";
import Button from "../components/Button";
import "./Patients.css";

function Patients() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  return (
    <div className="patients">
      <div className="patients-page">
        <div className="patients-top-container">
          <div className="patients-top-left"></div>
          <div className="patients-top-right">
            <Button title="Uj felvetel" />
            <select name="cars" className="blood-selection">
              <option value="volvo">Valassz vertipust</option>
              <option value="volvo">A+</option>
              <option value="volvo">A-</option>
              <option value="saab">B-</option>
              <option value="opel">B+</option>
              <option value="audi">AB_</option>
              <option value="audi">AB+</option>
              <option value="audi">B-</option>
              <option value="audi">B+</option>
              <option value="audi">0-</option>
              <option value="audi">0+</option>
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
                  <th>Vértipus</th>
                  <th>Nem</th>
                  <th>Taj</th>
                  <th>Születési idő</th>
                  <th>Lakcim</th>
                  <th>Telefonszám</th>
                  <th>Emailcim</th>
                  <th>Verveteli adatok</th>
                  <th>Törlés</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>asdasds</td>
                  <td>asdsad</td>
                  <td>asdasds</td>
                  <td>sadsad</td>
                  <td>sadsad</td>
                  <td>sadsad</td>
                  <td>sadsad</td>
                  <td>sadsad</td>
                  <td>
                    <button className="tableBtn">Adatok</button>
                  </td>
                  <td>
                    <button className="tableBtn">Torles</button>
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
