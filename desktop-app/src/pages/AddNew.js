import React, { useState } from "react";
import Button from "../components/Button";

import API from "../utils/API";

import "./AddNew.css";

function AddNew() {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [gender, setGender] = useState("");
  const [taj, setTaj] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function addNew(e) {
    e.preventDefault();
      API.post("/add-patient", {
        name: name,
        bloodType: bloodType,
        gender: gender,
        taj: taj,
        birthdate: birthdate,
        address: address,
        phone: phone,
        email: email,
      }).then((result) => {
        alert("sikeres felvetel");
        handleReset();
      });
  }

  function handleReset(){
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  return (
    <div className="AddNew-page">
      <form onSubmit={addNew}>
        <div className="add-container">
        <div className="add-form">
          <div className="form-text">
            <label>Név</label>
            <label>Vércsoport</label>
            <label>Nem</label>
            <label>Taj</label>
            <label>Születési idő</label>
            <label>Lakcim</label>
            <label>Telefonszám</label>
            <label>Emailcim</label>
          </div>
          <div className="form-input">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setBloodType(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setGender(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setTaj(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setBirthdate(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
            ></input>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            ></input>
            
          </div>
        </div>
        <div className="bot-Btn"><Button title="Felvesz" /></div>
        
        </div>
        
      </form>
    </div>
  );
}

export default AddNew;