import React, { useState } from "react";
import "./Modal.css";
import Button from "./Button";

export default function Modal() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    return (
        <>
       <Button title='Regisztráció' onClick={toggleModal}/>

        {modal && (
            <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <h2>Figyelem</h2>
                <br/>
                <p>
                Az admin felületre csak a program jelenlegi fejlesztőinek van jogsultsága új admin felhasználókat létrehozni.
                </p>
                <br/>
                <p>Ha új admint szeretne felvenni további információkért kérjük forduljon a fejlesztőkhöz.</p>
                <button className="close-modal" onClick={toggleModal}>
                X
                </button>
                
            </div>
            </div>
        )}
        
        </>
    );
    }