import React from "react";
import Github_Logo from "../assets/github.png";
import "./Github.css";
import Button from "../components/Button";

function Github() {
  return (
    <div className="Github-page">
      <div className="Github">
        <div className="Github-top-container">
          <img src={Github_Logo} alt="Github Logo" className="Github-logo" />
        </div>
        <div className="Git-link-container">
          <h1 className="Title">GitHub linkek</h1>
          <div className="Git-link">
            <Button
              title="Hegedűs György Károly"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "https://github.com/Gyuri21";
              }}
            />
            <Button
              title="Oláh János Gergely"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "https://github.com/j9nos";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Github;
