import React, { useState } from "react";
import MEDICLOUD_LOGO from "../assets/medicloud-text-white.png";
import "./Login.css";
import Modal from "../components/Modal";
import Button from "../components/Button";

function Login() {
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

          <div className="Login-mid-container">
            <input type="number" placeholder="Felhasználónév" />
            <input type="password" placeholder="Jelszó" />
          </div>

          <div className="Login-bot-container">
            <Button title='Belépés'/>
            <Modal />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
