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
        handleReset();
      });
  }

  function handleReset(){
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input5").value = "";
    document.getElementById("input6").value = "";
    document.getElementById("input7").value = "";
    document.getElementById("input8").value = "";
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
            <label>Lakcím</label>
            <label>Telefonszám</label>
            <label>Email cím</label>
          </div>
          <div className="form-input">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="input1"
            ></input>
            <input
              onChange={(e) => setBloodType(e.target.value)}
              type="text"
              id="input2"
            ></input>
            <input
              onChange={(e) => setGender(e.target.value)}
              type="text"
              id="input3"
            ></input>
            <input
              onChange={(e) => setTaj(e.target.value)}
              type="number"
              id="input4"
            ></input>
            <input
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
              id="input5"
            ></input>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              id="input6"
            ></input>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              id="input7"
            ></input>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="input8"
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