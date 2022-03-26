import React from "react";
import { useNavigate} from "react-router-dom";
import "./Home.css";
import Button from "../components/Button";

function Home() {

  let navigate = useNavigate();

  function navigateToPatients(){
    navigate("./patients")
  }

  return (
    <div className="home">
      <div className="home-main-container">
        <div className="home-top-container">
          <h1 className="title">Üdvözöljük a Medicloud felületén</h1>
          <p>Orvosként hozzáférése van a páciensek adataihoz</p>
          <p>
            Lehetőságe van a páciensek adatainak a módositására, törlésére, es új adat felvételére. Valamint a vérvételek kezelésére.
          </p>
        </div>
        <div className="home-bot-container">
          <Button
            title="Website"
            className="LinkBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "";
            }}
          />
          <Button title="Páciensek" onClick={navigateToPatients}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
