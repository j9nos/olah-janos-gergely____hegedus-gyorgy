import React from "react";
import Button from "../components/Button";
import "./AddNew.css";

function AddNew() {
  return (
    <div className="AddNew-page">
      <form>
        <div className="add-form">
          
          <div className="form-text">
            <label>Vértipus</label>
            <label>Név</label>
            <label>Nem</label>
            <label>Taj</label>
            <label>Születési idő</label>
            <label>Lakcim</label>
            <label>Telefonszám</label>
            <label>Emailcim</label>
          </div>
          <div className="form-input">
            <input type="text"></input>
            <input type="text"></input>
            <input type="text"></input>
            <input type="number"></input>
            <input type="number"></input>
            <input type="text"></input>
            <input type="number"></input>
            <input type="email"></input>
          </div>
        </div>
        
      </form>
      <Button  title="Felvesz"/>    
    </div>
  );
}

export default AddNew;
