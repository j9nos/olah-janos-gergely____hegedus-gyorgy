import ReactDOM from "react-dom";
import "./setting.css";
import { RiCloseCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";

import { BiSlider } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import API from "../../../utils/API";

const SETTING = () => {
  useEffect(() => {
    getPatientData();
    document.addEventListener("keydown", keyListener);
  }, []);

  function keyListener(e) {
    if (e.key === "Escape") {
      closeSettings();
    }
  }
  function closeSettings() {
    ReactDOM.unmountComponentAtNode(document.getElementById("settings"));
    document.removeEventListener("keydown", keyListener);
  }

  function getPatientData() {
    API.get("/patient-profile-data").then((result) =>
      setPatientData(result.data)
    );
  }

  const [patientData, setPatientData] = useState([]);

  const [addressInput, toggleAddress] = useState(false);
  const [phoneInput, togglePhone] = useState(false);
  const [emailInput, toggleEmail] = useState(false);

  const [addressChange, setAddressChange] = useState("");
  const [phoneChange, setPhoneChange] = useState("");
  const [emailChange, setEmailChange] = useState("");

  function toggleAddressInput() {
    togglePhone(false);
    toggleEmail(false);
    toggleAddress(!addressInput);
  }

  function togglePhoneInput() {
    toggleAddress(false);
    toggleEmail(false);
    togglePhone(!phoneInput);
  }
  function toggleEmailInput() {
    toggleAddress(false);
    togglePhone(false);
    toggleEmail(!emailInput);
  }

  function saveAddress() {
    console.log(addressChange);
    API.post("/patient-change-address", { newAddress: addressChange }).then(
      (result) => console.log(result)
    );
    closeSettings();
  }

  function savePhone() {
    console.log(phoneChange);
    API.post("/patient-change-phone", { newPhone: phoneChange }).then(
      (result) => console.log(result)
    );
    closeSettings();
  }
  function saveEmail() {
    console.log(emailChange);
    API.post("/patient-change-email", { newEmail: emailChange }).then(
      (result) => console.log(result)
    );
    closeSettings();
  }

  return (
    <div className="setting">
      <button onClick={closeSettings} className="quit-button">
        <RiCloseCircleFill />
      </button>
      <div className="setting-container">
        <span className="setting-name">
          <h1>{patientData.patient_name}</h1>
        </span>
        <table className="setting-table">
          <tbody>
            <tr className="setting-tr">
              <th className="setting-th">Vércsoport</th>
              <td className="setting-td">{patientData.patient_blood_type}</td>
            </tr>
            <tr className="setting-tr">
              <th className="setting-th">TAJ-szám</th>
              <td className="setting-td">{patientData.patient_taj}</td>
            </tr>
            <tr className="setting-tr">
              <th className="setting-th">Cím</th>
              <td className="setting-td">
                {!addressInput ? (
                  patientData.patient_address
                ) : (
                  <input
                    className="setting-input"
                    type="text"
                    onChange={(e) => {
                      setAddressChange(e.target.value);
                    }}
                    value={addressChange}
                  />
                )}
              </td>
              <td>
                {addressInput ? (
                  <IoIosSave
                    onClick={saveAddress}
                    className="sgreen setting-icon"
                  />
                ) : (
                  <BiSlider
                    onClick={toggleAddressInput}
                    className="syellow setting-icon"
                  />
                )}
              </td>
            </tr>
            <tr className="setting-tr">
              <th className="setting-th">Telefon</th>
              <td className="setting-td">
                {!phoneInput ? (
                  patientData.patient_phone
                ) : (
                  <input
                    className="setting-input"
                    type="text"
                    onChange={(e) => {
                      setPhoneChange(e.target.value);
                    }}
                    value={phoneChange}
                  />
                )}
              </td>
              <td>
                {phoneInput ? (
                  <IoIosSave
                    onClick={savePhone}
                    className="sgreen setting-icon"
                  />
                ) : (
                  <BiSlider
                    onClick={togglePhoneInput}
                    className="syellow setting-icon"
                  />
                )}
              </td>
            </tr>
            <tr className="setting-tr">
              <th className="setting-th">E-mail</th>
              <td className="setting-td">
                {!emailInput ? (
                  patientData.patient_email
                ) : (
                  <input
                    className="setting-input"
                    type="text"
                    onChange={(e) => {
                      setEmailChange(e.target.value);
                    }}
                    value={emailChange}
                  />
                )}
              </td>
              <td>
                {emailInput ? (
                  <IoIosSave
                    onClick={saveEmail}
                    className="sgreen setting-icon"
                  />
                ) : (
                  <BiSlider
                    onClick={toggleEmailInput}
                    className="syellow setting-icon"
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="setting-password">
          <button className="password-button">Jelszó megváltoztatása</button>
        </div>
      </div>
    </div>
  );
};
export default SETTING;
