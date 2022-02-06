import React from "react";
import "./ModalData.css";
import { useState } from "react";
import Button from "./Button";

export default function ModalData() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <button className="ModalDataBtn" onClick={toggleModal}>
        Adatok
      </button>
      {modal && (
        <div className="modalData">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalData-content">
            <h1>Hegedus Gyorgy</h1>
            <button className="close-modalData" onClick={toggleModal}>
              X
            </button>

            <div className="Modal-container">
              <label>Vercsoport</label>
              <input></input>
              <label>Verosszetetel</label>
              <input></input>
              <label>Verosszetetel erteke</label>
              <input></input>
              <label>Vert vevo orvos neve</label>
              <input></input>
              <label>Vervetel ideje</label>
              <input></input>
            </div>
            <button className="ModalModifyBtn">Hozzaadas</button>
            <button className="ModalModifyBtn">Modositas</button>
            <button className="ModalModifyBtn">Torles</button>
          </div>
        </div>
      )}
    </>
  );
}
