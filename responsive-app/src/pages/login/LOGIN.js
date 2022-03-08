import React, { useState } from "react";

import "./login.css";
import TEXT from "../../assets/medicloud-text.png";
import API from "../../utils/API";

import { ImKey } from "react-icons/im";

const LOGIN = () => {
  const [enteredTAJ, setEnteredTAJ] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("...");

  function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("...");
    API.post("/patient-authentication", {
      taj: enteredTAJ,
      password: enteredPassword,
    }).then((result) =>
      result.data.authed
        ? window.location.reload()
        : setErrorMessage(result.data.message)
    );
  }
  return (
    <div className="login">


      <form className="login-form" onSubmit={handleLogin}>


        <div className="login-top">
          <img src={TEXT} alt="Medicloud Logo" className="login-logo" />
        </div>


        <div className="login-mid">

          <input
            className="login-input"
            type="text"
            placeholder="TAJ szám"
            onChange={(e) => {
              setEnteredTAJ(e.target.value);
            }}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Jelszó"
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
          />
        </div>


        
        <div className="login-bot">
          <input className="login-button" type="submit" value="Belépés" />
        </div>

        <p className="login-err">{errorMessage}</p>
      </form>
    </div>
  );
};
export default LOGIN;
