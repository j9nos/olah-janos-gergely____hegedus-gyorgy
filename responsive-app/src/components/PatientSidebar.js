import React from "react";

import SNAKE_ICON from "../assets/icon.png";

import { MdBloodtype, MdLogout, MdSettings } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { BiTestTube, BiSliderAlt, BiIdCard, BiExit } from "react-icons/bi";

import { CgLogOut } from "react-icons/cg";
import { AiOutlineProfile } from "react-icons/ai";

import "./PatientSidebar.css";

const PatientSidebar = (props) => {
  return (
    <div className="PatientSidebar">
      <div className="PatientSidebar-top-container">
        <img src={SNAKE_ICON} className="PatientSidebar-icon" />
      </div>

      <div className="PatientSidebar-mid-container">
        <button onClick={props.handleRenderProfile}>
          <BiIdCard />
        </button>
        <button onClick={props.handleRenderBloodtest}>
          <BiTestTube />
        </button>
        <button onClick={props.handleRenderSettings}>
          <BiSliderAlt />
        </button>
      </div>

      <div className="PatientSidebar-bot-container">
        <button onClick={props.handleLogout}>
          <BiExit />
        </button>
      </div>
    </div>
  );
};
export default PatientSidebar;
