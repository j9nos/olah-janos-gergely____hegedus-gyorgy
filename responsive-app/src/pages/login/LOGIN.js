import "./login.css";
import MEDICLOUD_TEXT from "../../assets/medicloud-text.png";
import { useState } from "react";
import API from "../../utils/API";

const LOGIN = () => {
  const [taj, setTaj] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("...");

  function handleLogin(e) {
    e.preventDefault();
    setMessage("...");
    API.post("/patient-authentication", {
      taj: taj,
      password: password,
    }).then((result) =>
      result.data.authed
        ? window.location.reload()
        : setMessage(result.data.message)
    );
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-top">
          <img
            src={MEDICLOUD_TEXT}
            alt="MEDICLOUD TEXT"
            className="login-logo"
          />
        </div>

        <div className="login-mid">
          <input
            className="login-input"
            type="MEDICLOUD_TEXT"
            placeholder="TAJ szám"
            onChange={(e) => {
              setTaj(e.target.value);
            }}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Jelszó"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="login-bot">
          <input className="login-button" type="submit" value="Belépés" />
        </div>

        <p className="login-message">{message}</p>
      </form>
    </div>
  );
};
export default LOGIN;
