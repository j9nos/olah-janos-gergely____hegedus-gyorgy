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
          
          <Button value='Doktorok'/>
          <Button value='Website'/>
          <Button value='Paciensek'/>
        </div>
      </div>
    </div>
  );
}

export default Home;
