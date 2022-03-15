import "./sidebar.css";

import ICON from "../../assets/medicloud-icon333333.png";
import API from "../../utils/API";
import { useEffect, useState } from "react";
import { refineDate } from "../../utils/dataRefinery";

const SIDEBAR = (props) => {
  useEffect(() => {
    API.get("/patient-blood-test-dates").then((result) =>
      setDates(result.data)
    );
  }, []);

  const [dates, setDates] = useState([]);

  const dateButtons = dates.map((e, index) => {
    return (
      <button
        className="sidebar-button"
        tabIndex={-1}
        key={index}
        onClick={() => {
          props.onDateClicked(e.blood_tests_taken_date);
        }}
      >
        {e.blood_tests_taken_date.split("-")[0]}
        <br />
        {e.blood_tests_taken_date.split("-")[1]}-
        {e.blood_tests_taken_date.split("-")[2]}
      </button>
    );
  });
  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-inner-top">
          <img src={ICON} className="sidebar-icon" onClick={props.onSnakeHeadClick} />
        </div>
        <div className="sidebar-list">{dateButtons}</div>
      </div>
    </div>
  );
};
export default SIDEBAR;
