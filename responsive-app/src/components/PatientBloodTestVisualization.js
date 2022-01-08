import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

import "./PatientBloodTestVisualization.css";

const PatientBloodTestVisualization = (props) => {
  const data = [
    {
      abbrv: props.incomingData.blood_test_component_abbreviation,
      name: props.incomingData.blood_test_component_name,
      meas: props.incomingData.blood_test_component_measurement,

      min: Math.round(
        parseInt(props.incomingData.blood_test_component_normal_range.split("-")[0])
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

  return (
    <div className="patient-blood-test-visualization">
      {props.incomingData.blood_test_component_abbreviation}
      <div style={{ width: 500, height: 30 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 50, right: 50 }}
          >
            <XAxis hide type="number" />
            <YAxis hide
              type="category"
              dataKey="abbrv"
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
                <stop offset="0" stopColor="red" />
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
                <stop offset="1" stopColor="red" />
              </linearGradient>
            </defs>

            <Bar dataKey="min" fill="url(#left)" radius={[10, 0, 0, 10]} stackId="a" />
            <Bar dataKey="good" fill="rgb(0,255,50)" stackId="a" />
            <Bar dataKey="max" fill="url(#right)" radius={[0, 10, 10, 0]} stackId="a" />
            <ReferenceLine
              x={props.incomingData.blood_tests_component_value}
              label={{value:props.incomingData.blood_tests_component_value+" "+props.incomingData.blood_test_component_measurement, fill:'white'}}
              stroke="rgb(200,200,200)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PatientBloodTestVisualization;
