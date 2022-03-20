import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import VISUALIZATION from "./VISUALIZATION";

const BLOODTEST = (props) => {
  useEffect(() => {
    API.post("/patient-blood-test-results", { date: props.date }).then(
      (result) => {
        setBloodTestResults(result.data);
      }
    );
  }, [props.date]);

  const [bloodTestResults, setBloodTestResults] = useState([]);

  return (
    <>
      <div className="date">{props.date}</div>
      <div className="page">
        <div className="container">
          {bloodTestResults.map((bldts, index) => {
            return <VISUALIZATION key={index} rawData={bldts} />;
          })}
        </div>
      </div>
    </>
  );
};
export default BLOODTEST;
