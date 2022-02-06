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
            <button className="close-modalData" onClick={toggleModal}>
              X
            </button>
            
            <div className="Modal-container">
              <div className="input-left">
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
              </div>
              <div className="input-right">
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                <input placeholder="Kereses" />
                </div>  
            </div>
            <button className="ModalModifyBtn">Modositas</button>
          </div>
        </div>
      )}
    </>
  );
}
