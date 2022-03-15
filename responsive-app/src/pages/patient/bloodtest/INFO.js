const INFO = (props) => {
  return (
    <div className="info-container">
      <div className="info">
        <div className="info-segment">
          <span className="info-title">Név:</span>
          <h1>{props.data.blood_test_component_name}</h1>
        </div>
        <div className="info-segment">
          <span className="info-title">Normál érték:</span>
          <h2>
            {props.data.blood_test_component_normal_range}{" "}
            {props.data.blood_test_component_measurement}
          </h2>
        </div>

        <div className="info-segment">
          <span className="info-title">Jelentése:</span>
          <h3>{props.data.blood_test_component_description}</h3>
        </div>
      </div>
    </div>
  );
};
export default INFO;
