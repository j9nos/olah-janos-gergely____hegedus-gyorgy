import ReactDOM from "react-dom";
import { useState } from "react";
import API from "../../../utils/API";
const PASSWORD = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  function saveNewPassword(e) {
    e.preventDefault();
    if (newPassword1 !== newPassword2) {
      alert("A két új jelszó nem egyezik meg");
    } else {
      API.post("/patient-change-password", {
        oldPassword: oldPassword,
        newPassword: newPassword1,
      }).then((result) => alert(result.data.message));
    }
  }

  return (
    <div className="password">
      <form className="password-form" onSubmit={saveNewPassword}>
        <input
          className="password-input"
          type="password"
          placeholder="Jelenlegi jelszó"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Új jelszó"
          onChange={(e) => setNewPassword1(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Új jelszó megint"
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        <input className="password-save-button" type="submit" value="Mentés" />
      </form>
    </div>
  );
};
export default PASSWORD;
