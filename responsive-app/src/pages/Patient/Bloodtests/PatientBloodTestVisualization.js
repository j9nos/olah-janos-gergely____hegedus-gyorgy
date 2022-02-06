import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from "recharts";

import "./PatientBloodTestVisualization.css";

const PatientBloodTestVisualization = (props) => {
  const data = [
    {
      name: props.incomingData.blood_test_component_name,
      meas: props.incomingData.blood_test_component_measurement,
      min: Math.round(
        parseInt(
          props.incomingData.blood_test_component_normal_range.split("-")[0]
        )
      ),
      good: Math.round(
        parseInt(
          props.incomingData.blood_test_component_normal_range.split("-")[1]
        ) -
          parseInt(
            props.incomingData.blood_test_component_normal_range.split("-")[0]
          )
      ),
      max: Math.round(
        parseInt(
          props.incomingData.blood_test_component_normal_range.split("-")[1]
        ) * 1.75
      ),

      desc: props.incomingData.blood_test_component_description,
      val: props.incomingData.blood_tests_component_value,

      dr: props.incomingData.doctor_name,
    },
  ];

  const TooltipContent = () => {
    return (
      <div className="patient-blood-test-visualization-tooltip">
        <h1>
          <u>{props.incomingData.blood_test_component_name}</u>
        </h1>
        <p>
          Tartomány:{" "}
          <b>{props.incomingData.blood_test_component_normal_range}</b>{" "}
          <i>{props.incomingData.blood_test_component_measurement}</i>
        </p>
        <p>
          Ön értéke: <b>{props.incomingData.blood_tests_component_value}</b>{" "}
          <i>{props.incomingData.blood_test_component_measurement}</i>
        </p>
        <h1>
          <u>Jelentése:</u>
        </h1>
        <i>{props.incomingData.blood_test_component_description}</i>
        <h1>
          <u>A tesztet végezte:</u>
        </h1>
        <i>{props.incomingData.doctor_name}</i>
      </div>
    );
  };

  function isOutOfRange() {
    if (
      parseInt(
        props.incomingData.blood_test_component_normal_range.split("-")[0]
      ) > parseInt(props.incomingData.blood_tests_component_value) ||
      parseInt(
        props.incomingData.blood_test_component_normal_range.split("-")[1]
      ) < parseInt(props.incomingData.blood_tests_component_value)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="patient-blood-test-visualization">
      <div
        className="patient-bloodtest-visualization-title"
        style={{ color: isOutOfRange() ? "rgb(255,50,50)" : "rgb(72, 225, 0)" }}
      >
        {props.incomingData.blood_test_component_name}
      </div>
      <div className="patient-bloodtest-visualization-bar">
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 50, right: 50 }}
          >
            <XAxis hide type="number" />
            <YAxis
              hide
              type="category"
              dataKey="name"
              stroke="#FFFFFF"
              fontSize="12"
            />
            <defs>
              <linearGradient
                id="left"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                spreadMethod="reflect"
              >
                <stop offset="0" stopColor="rgb(255,50,50)" />
                <stop offset="1" stopColor="orange" />
              </linearGradient>
              <linearGradient
                id="right"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                spreadMethod="reflect"
              >
                <stop offset="0" stopColor="orange" />
                <stop offset="1" stopColor="rgb(255,50,50)" />
              </linearGradient>
            </defs>
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              cursor={{ fill: "none" }}
              content={TooltipContent}
            />
            <Bar
              dataKey="min"
              fill="url(#left)"
              radius={[10, 0, 0, 10]}
              stackId="a"
            />
            <Bar dataKey="good" fill="rgb(72, 225, 0)" stackId="a" />
            <Bar
              dataKey="max"
              fill="url(#right)"
              radius={[0, 10, 10, 0]}
              stackId="a"
            />
            <ReferenceLine
              x={props.incomingData.blood_tests_component_value}
              label={{
                value:
                  props.incomingData.blood_tests_component_value +
                  " " +
                  props.incomingData.blood_test_component_measurement,
                fill: "rgb(51,51,51)",
              }}
              stroke="rgb(255,255,255)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PatientBloodTestVisualization;
