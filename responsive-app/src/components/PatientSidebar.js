import React from "react";

import SNAKE_ICON from "../assets/icon.png";

import {
  MdBloodtype,
  MdMedication,
  MdLogout,
  MdSettings,
} from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { RiProfileFill } from "react-icons/ri";

import "./PatientSidebar.css";

const PatientSidebar = (props) => {
  return (
    <div className="PatientSidebar">
      <div className="PatientSidebar-top-container">
        <img src={SNAKE_ICON} className="PatientSidebar-icon" />
      </div>
      <div className="PatientSidebar-mid-container">
        <button onClick={props.handleRenderProfile}>
          <RiProfileFill />
        </button>
        <button onClick={props.handleRenderBloodtest}>
          <MdBloodtype />
        </button>
        <button onClick={props.handleRenderAppointment}>
          <BsCalendar3 />
        </button>
        <button onClick={props.handleRenderMedication}>
          <MdMedication />
        </button>
        <button onClick={props.handleRenderSettings}>
          <MdSettings />
        </button>
      </div>
      <div className="PatientSidebar-bot-container">
        <button onClick={props.handleLogout}>
          <MdLogout />
        </button>
      </div>
    </div>
  );
};
export default PatientSidebar;
