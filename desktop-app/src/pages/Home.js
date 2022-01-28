import React from "react";
import { Link,useNavigate} from "react-router-dom";
import "./Home.css";
import Button from "../components/Button";

function Home() {

  let navigate = useNavigate();
  
  function navigateToDoctors(){
    navigate("./doctors")
  }
  function navigateToPatients(){
    navigate("./patients")
  }

  return (
    <div className="home">
      <div className="home-main-container">
        <div className="home-top-container">
          <h1 className="title">Udvozoljuk a Medicloud Admin feluleten</h1>
          <p>Itt kezelheti a doktorok es a pacienkse adatait egyarant</p>
          <p>
            Lehetosege van a paciensek es a doktorok adatainak
            modositasara,torlesere, es uj adata felvetelere.
          </p>
        </div>
        <div className="home-bot-container">
          <Button title="Doktorok" onClick={navigateToDoctors}/>
          <Button
            title="Website"
            className="LinkBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "";
            }}
          />
          <Button title="Paciensek" onClick={navigateToPatients}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
