import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Button from "../components/Button";

function Home() {
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
          <button
            className="homeBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "http://localhost:3000/patients";
            }}
          >
            Paciensek
          </button>
          <Button/>
          <button
            className="homeBtn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "http://localhost:3000/doctors";
            }}
          >
            Doktorok
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
