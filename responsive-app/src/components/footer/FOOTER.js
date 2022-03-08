import "./footer.css";

import { BiSlider } from "react-icons/bi";
import { MdOutlineLogout, MdOutlineBloodtype } from "react-icons/md";

const FOOTER = (props) => {
  return (
    <>
      <div className="footer">
        <button
          className="footer-button"
          onClick={props.onClickOpenSettings}
          tabIndex={-1}
        >
          <BiSlider />
        </button>
        <h1 className="footer-text">{props.patientData.patient_taj}</h1>
        <button
          onClick={props.onClickLogout}
          className="footer-button"
          tabIndex={-1}
        >
          <MdOutlineLogout />
        </button>
      </div>

      <div className="blood-type">
        <span className="blood-type-text">
          {props.patientData.patient_blood_type}
        </span>
      </div>

      <div className="blood-type-tooltip">
        <span>A vércsoportod</span>
      </div>
    </>
  );
};
export default FOOTER;
