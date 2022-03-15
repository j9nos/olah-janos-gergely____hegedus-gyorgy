import "./component.css";
import { useEffect, useState } from "react";
import API from "../../../utils/API";
import INFO from "./INFO";

import { BiTestTube } from "react-icons/bi";

const COMPONENT = () => {
  useEffect(() => {
    API.get("/patient-components").then((result) => setComponents(result.data));
  }, []);
  const [components, setComponents] = useState([]);
  const [selected, setSelected] = useState("");

  function selectComponent(argComponent) {
    setSelected(argComponent);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="component">
          <div className="component-list">
            {components.map((e, index) => {
              return (
                <button
                  key={index}
                  className="component-button"
                  onClick={() => selectComponent(e)}
                >
                  {e.blood_test_component_name}
                  <BiTestTube className="test-tube" />
                </button>
              );
            })}
          </div>
        </div>
        {selected && <INFO data={selected} />}
      </div>
    </div>
  );
};
export default COMPONENT;
