import React, { useState } from "react";

import "./Login.css";
import MEDICLOUD_LOGO from "../assets/medicloud-text.png";

import API from "../utils/API";

const Login = () => {
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
    <>
      <div className="Login">
        <form className="Login-form" onSubmit={handleLogin}>
          <div className="Login-top-container">
            <img
              src={MEDICLOUD_LOGO}
              alt="Medicloud Logo"
              className="Login-logo"
            />
          </div>
          <div className="Login-mid-container">
            <input
              type="number"
              placeholder="TAJ szám"
              onChange={(e) => {
                setEnteredTAJ(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Jelszó"
              onChange={(e) => {
                setEnteredPassword(e.target.value);
              }}
            />
          </div>
          <div className="Login-bot-container">
            <input type="submit" value="Belépés" />
          </div>
          <p>{errorMessage}</p>
        </form>
      </div>
    </>
  );
};
export default Login;
