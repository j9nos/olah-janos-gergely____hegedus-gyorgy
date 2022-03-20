import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import ModalData from "../components/ModalData";
import API from "../utils/API";
import "./Patients.css";
import { useNavigate } from "react-router-dom";
import { reloadOnExpiration, logout } from "../utils/authorization";

function Modal(props) {
  useEffect(() => {
    getPatientData();
  }, []);
  const [patientData, setPatientData] = useState([]);

  function getPatientData(e) {
    e.preventDefault();
    API.post("/selectPatient", {
      id: props.patient_id,
    }).then((result) => {
      setPatientData(result.data);
    });
  }

  return (
    <div className="modalData">
      <div className="modalData-content">
        <h1>{props.data.patient_name}</h1>
        <button onClick={props.onQuit}>X</button>
        <h1>{props.data.patient_id}</h1>
        <h1>{patientData.blood_test_component_name}</h1>

        <div className="Modal-container">
          <label>Vercsoport</label>
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
  );
}

import { reloadOnExpiration } from "../utils/authorization";

function Patients() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modalOn, setModalOn] = useState(false);

  function selectOne(arg) {
    setSelected(arg);
  }
  function openModalUp() {
    if (selected.patient_name) {
      setModalOn(true);
    } else {
      setModalOn(false);
    }
  }
  function closeModal() {
    setModalOn(false);
  }

  useEffect(() => {
    API.get("/patients").then((result) => setPatients(result.data));
    const interval = setInterval(() => {
      reloadOnExpiration();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = patients.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setPatients([...patients]);
    }
  };
  let navigate = useNavigate();

  function navigatetoAddNew() {
    navigate("/patients/AddNew");
  }

  const [component_name, setComponent_name] = useState([]);

  return (
    <div className="patients">
      <div className="patients-page">
        <div className="patients-top-container">
          <div className="patients-top-left"></div>
          <div className="patients-top-right">
            <button onClick={navigatetoAddNew} className="NewPatientBtn">
              Uj felvetel
            </button>
            <input placeholder="Kereses" value={value} onChange={filterData} />
            <button onClick={openModalUp}>Kivalaszt</button>
            {modalOn && <Modal data={selected} onQuit={closeModal} />}
          </div>
        </div>
        <div className="patients-mid-container">
          <div className="patients-left"> </div>
          <div className="patients-table-container">
            <table>
              <thead>
                <tr>
                  <th>Vercsoport</th>
                  <th>Név</th>
                  <th>Nem</th>
                  <th>Taj</th>
                  <th>Születési idő</th>
                  <th>Lakcim</th>
                  <th>Telefonszám</th>
                  <th>Emailcim</th>
                </tr>
              </thead>
              <tbody>
                {value.length > 0
                  ? tableFilter.map((patient, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => {
                            selectOne(patient);
                          }}
                        >
                          <td>{patient.patient_blood_type}</td>
                          <td>{patient.patient_name}</td>
                          <td>{patient.patient_gender}</td>
                          <td>{patient.patient_taj}</td>
                          <td>{patient.patient_birthdate.split("T")[0]}</td>
                          <td>{patient.patient_address}</td>
                          <td>{patient.patient_phone}</td>
                          <td>{patient.patient_email}</td>
                        </tr>
                      );
                    })
                  : patients.map((patient, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => {
                            selectOne(patient);
                          }}
                        >
                          <td>{patient.patient_blood_type}</td>
                          <td>{patient.patient_name}</td>
                          <td>{patient.patient_gender}</td>
                          <td>{patient.patient_taj}</td>
                          <td>{patient.patient_birthdate.split("T")[0]}</td>
                          <td>{patient.patient_address}</td>
                          <td>{patient.patient_phone}</td>
                          <td>{patient.patient_email}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div className="patients-right"></div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
