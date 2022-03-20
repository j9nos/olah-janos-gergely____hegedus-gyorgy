import ReactDOM from "react-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";

import { BiSlider } from "react-icons/bi";
import { IoIosSave } from "react-icons/io";
import API from "../../../utils/API";
import PASSWORD from "./PASSWORD";

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
    API.get("/patient-profile-data").then(
      (result) => (
        setAddress(result.data.patient_address),
        setPhone(result.data.patient_phone),
        setEmail(result.data.patient_email)
      )
    );
  }
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [togglePassword, setTogglePassword] = useState(false);

  function saveAddress(e) {
    e.preventDefault();
    if (address.length > 0) {
      API.post("/patient-change-address", { newAddress: address })
        .then((result) => alert(result.data.message))
        .then(() => {
          closeSettings();
        });
    } else {
      alert("Ne hagyj mezőt üresen!");
    }
  }
  function savePhone(e) {
    e.preventDefault();
    if (phone.length > 0) {
      API.post("/patient-change-phone", { newPhone: phone })
        .then((result) => alert(result.data.message))
        .then(() => {
          closeSettings();
        });
    } else {
      alert("Ne hagyj mezőt üresen!");
    }
  }
  function saveEmail(e) {
    e.preventDefault();
    if (phone.length > 0) {
      API.post("/patient-change-email", { newEmail: email })
        .then((result) => alert(result.data.message))
        .then(() => {
          closeSettings();
        });
    } else {
      alert("Ne hagyj mezőt üresen!");
    }
  }

  function togglePasswordModal() {
    setTogglePassword(!togglePassword);
  }

  return (
    <>
      <div className="setting">
        <button onClick={closeSettings} className="quit-button">
          <RiCloseCircleFill />
        </button>
        <div className="setting-container">
          <div className="setting-options">
            <form className="setting-form" onSubmit={saveAddress}>
              <input
                className="setting-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button tabIndex={-1} className="setting-save-button">
                <IoIosSave />
              </button>
            </form>

            <form className="setting-form" onSubmit={savePhone}>
              <input
                className="setting-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button tabIndex={-1} className="setting-save-button">
                <IoIosSave />
              </button>
            </form>

            <form className="setting-form" onSubmit={saveEmail}>
              <input
                className="setting-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button tabIndex={-1} className="setting-save-button">
                <IoIosSave />
              </button>
            </form>
          </div>

          <div className="setting-password">
            <button
              tabIndex={-1}
              className={
                togglePassword
                  ? "password-button password-button-toggle-true "
                  : "password-button password-button-toggle-false"
              }
              onClick={togglePasswordModal}
            >
              Jelszó megváltoztatása
            </button>
            {togglePassword && <PASSWORD />}
          </div>
        </div>
      </div>
    </>
  );
};
export default SETTING;
