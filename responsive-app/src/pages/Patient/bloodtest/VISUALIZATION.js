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
import { getVisualizationData } from "../../../utils/dataRefinery";

import "./visualization.css";

const VISUALIZATION = (props) => {
  const data = getVisualizationData(props.rawData);
  const TooltipContent = () => {
    return (
      <div className="visualization-tooltip">
        <h1>
          <u>{props.rawData.blood_test_component_name}</u>
        </h1>
        <p>
          Tartomány: <b>{props.rawData.blood_test_component_normal_range}</b>{" "}
          <i>{props.rawData.blood_test_component_measurement}</i>
        </p>
        <p>
          Ön értéke: <b>{props.rawData.blood_tests_component_value}</b>{" "}
          <i>{props.rawData.blood_test_component_measurement}</i>
        </p>
        <h1>
          <u>Jelentése:</u>
        </h1>
        <i>{props.rawData.blood_test_component_description}</i>
        <h1>
          <u>A tesztet végezte:</u>
        </h1>
        <i>{props.rawData.doctor_name}</i>
      </div>
    );
  };

  return (
    <div className="visualization">
      <div className="visualization-title">
        {props.rawData.blood_test_component_name}
      </div>

      <div className="visualization-bar">
        <ResponsiveContainer>
          <BarChart layout="vertical" data={data}>
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
                <stop offset="0" stopColor="#eb1717" />
                <stop offset="1" stopColor="#eb8117" />
              </linearGradient>
              <linearGradient
                id="right"
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                spreadMethod="reflect"
              >
                <stop offset="0" stopColor="#eb8117" />
                <stop offset="1" stopColor="#eb1717" />
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
              x={props.rawData.blood_tests_component_value}
              label={{
                value: "×",
                fill: "#ffffff",
              }}
              stroke="#ffffff"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default VISUALIZATION;
