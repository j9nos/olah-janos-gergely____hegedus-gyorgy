import React from "react";
import "./About.css";
import MEDICLOUD_LOGO from "../assets/medicloud-text.png";
import icon from "../assets/icon.png";

function About() {
  return (
    <div className="about">
      <div className="About-page-container">
        <div className="about-top-container">
          <h1 className="about-title">Rólunk</h1>
        </div>
        <div className="about-bot-container">
          <div className="bot-left-container">
            <img
              src={MEDICLOUD_LOGO}
              alt="Medicloud Logo"
              className="logo-about"
            />
          </div>
          <div className="bot-right-container">
            <h3 className="small-title">Az alkalmazásról:</h3>
            <p className="about-text">
            A fejlesztés célja, hogy egy olyan felhasználóbarát egészségügyi felhő alkalmazást hozzunk létre, amely segíti a pácienseket nyomon követni a vérvételi eredményeiket. Tudatja a felhasználókat arról, hogy melyik vérvételi komponens miért fontos.
            Az alkalmazás ezen felületén a egeszségügyi csapatok vezetőinek van lehetősége a doktorok és páciensek adatainak a nyomonkövetésére, módositására.
            </p>
            <h3 className="small-title">A desingról:</h3>
            <p className="about-text"> Az oldalak stilusának a célja a zöld szinnekel egy kellemes ugyan akkor jól látható környezetet teremteni a felhasználó számára ami könnyit az alkalmazás használatát.</p>
            <div className="div-icon">
            <img
              src={icon}
              alt="Medicloud Logo"
              className="icon-about"
            />
            <p className="icon-text">A csavarodó kígyó motívum már évezredek óta létezik és mindig is a gyógyítás, a gyógyulást elősegítő szérumok és azok elkészítőjének szimbóluma volt.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
