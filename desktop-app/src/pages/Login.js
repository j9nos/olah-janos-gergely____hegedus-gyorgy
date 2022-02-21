import React, { useState } from "react";
import MEDICLOUD_LOGO from "../assets/medicloud-text-white.png";
import "./Login.css";
import Modal from "../components/Modal";
import Button from "../components/Button";
import API from "../utils/API";

function Login() {
  const [errorMessage, setErrorMessage] = useState("...");

  const [license, setLicense] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    console.log("Meghívva");
    e.preventDefault();
    API.post("/doctor-authentication", {
      license: license,
      password: password,
    }).then((result) =>
      result.data.authed
        ? window.location.reload()
        : setErrorMessage(result.data.message)
    );
  }

  return (
    <div className="Login-page">
      <div className="Login">
        <div className="Login-form">
          <div className="Login-top-container">
            <img
              src={MEDICLOUD_LOGO}
              alt="Medicloud Logo"
              className="Login-logo"
            />
          </div>

          <form onSubmit={handleLogin}>
            <div className="Login-mid-container">
              <input
                type="text"
                placeholder="Engedély"
                onChange={(e) => setLicense(e.target.value)}
              />
              <input
                type="password"
                placeholder="Jelszó"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="Login-bot-container">
              <input type="submit" value="Belépés" />
              <Modal />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
