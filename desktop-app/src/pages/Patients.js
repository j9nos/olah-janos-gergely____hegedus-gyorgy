import React, { useEffect, useState } from "react";
import API from "../utils/API";
import "./Patients.css";
import { useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";

function Modal(props) {
  useEffect(() => {
    getPatientData();
  }, []);

  const [patientBloodTestResults, setPatientBloodTestResults] = useState([]);

  function getPatientData() {
    API.post("/selectPatient", {
      id: props.data.patient_id,
    }).then((result) => {
      setPatientBloodTestResults(result.data);
    });
  }
  const [selected, setSelected] = useState([]);

  function selectOne(arg) {
    setSelected(arg);
  }

  function deleteBloodtests(selected) {
    API.post("/delete_bloodtests_taken", {
      id: selected.blood_tests_taken_id,
    }).then((result) => {
      getPatientData();
    });
  }

  return (
    <div className="modalData">
      <div className="modalData-content">
        <h1>{props.data.patient_name}</h1>
        <h1>{props.data.patient_blood_type}</h1>
        <button onClick={props.onQuit} className="close-modal">
          X
        </button>
        <div className="modal-table-container">
          <table>
            <thead>
              <tr>
                <th>Név</th>
                <th>Mértékegység</th>
                <th>Ideális érték</th>
                <th>Mért érték</th>
                <th>Dátum</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {patientBloodTestResults.map((e, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      selectOne(e);
                    }}
                  >
                    <td>{e.blood_test_component_name}</td>
                    <td>{e.blood_test_component_measurement}</td>
                    <td>{e.blood_test_component_normal_range}</td>
                    <td>{e.blood_tests_component_value}</td>
                    <td>{e.blood_tests_taken_date.split("T")[0]}</td>
                    <td>
                      <button
                        className="trashBtn"
                        onClick={() => deleteBloodtests(e)}
                      >
                        <VscTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ModalData(props) {
  const [componentId, setComponentId] = useState("");
  const [componentValue, setComponentValue] = useState("");
  const [takenById, setTakenById] = useState("");
  const [takenDate, setTakenDate] = useState("");

  function addNew(e) {
    e.preventDefault();
    API.post("/addPatientBloodTestData", {
      componentId: componentId,
      componentValue: componentValue,
      id: props.data.patient_id,
      takenById: takenById,
      takenDate: takenDate,
    }).then((result) => {
      handleReset();
    });
  }

  function handleReset() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
  }

  return (
    <div className="ModalData">
      <div className="ModalDataContent">
        <h1>{props.data.patient_name}</h1>
        <h1>{props.data.patient_blood_type}</h1>
        <form className="ModalDataForm" onSubmit={addNew}>
          <div className="ModalDataForm-left">
            <h1>Komponens: </h1>
            <h1>Orvos neve: </h1>
            <h1>Mért érték: </h1>
            <h1>Dátum: </h1>
          </div>
          <div className="ModalDataForm-right">
            <select onChange={(e) => setComponentId(e.target.value)}>
              <option value="" selected disabled hidden>
                Érték
              </option>
              <option value="1">Fehérvérsejtszám</option>
              <option value="2">Vörösvértest</option>
              <option value="3">Hematokrit</option>
              <option value="4">Hemoglobin</option>
              <option value="5">Mean Cellular Volume</option>
              <option value="6">Mean Corpuscular Hemaglobin</option>
              <option value="7">Red blood cell Distribution Width</option>
              <option value="8">Trombocita</option>
              <option value="9">Alanin Amino-Transzferáz</option>
              <option value="10">Albumin</option>
              <option value="11">Összfehérje</option>
              <option value="12">Alkalikus Foszfatáz</option>
              <option value="13">Bilirubin</option>
              <option value="14">Karbamid</option>
              <option value="15">Kálcium</option>
              <option value="16">Klorid</option>
              <option value="17">Kreatinin</option>
              <option value="18">Terheléses vércukorvizsgálat</option>
              <option value="19">Foszfor</option>
              <option value="20">Kálium</option>
              <option value="21">Nátrium</option>
              <option value="22">Összkoleszterin</option>
              <option value="23">Nagy Sűrűségű Lipoprotein</option>
              <option value="24">Alacsony Sűrűségű Lipoprotein</option>
            </select>

            <select onChange={(e) => setTakenById(e.target.value)}>
              <option value="" selected disabled hidden>
                Érték
              </option>
              <option value="1">Cseh Andras</option>
            </select>
            <input
              onChange={(e) => setComponentValue(e.target.value)}
              type="number"
              id="input1"
            ></input>

            <input
              onChange={(e) => setTakenDate(e.target.value)}
              type="date"
              id="input2"
            ></input>
            <button>Felvesz</button>
          </div>
        </form>
        <button onClick={props.onQuit} className="close-modal">
          X
        </button>
      </div>
    </div>
  );
}
function ModalPassword(props) {
  const [password, setPassword] = useState("");

  function addPassword(e) {
    e.preventDefault();
    API.post("/addPassword", {
      id: props.data.patient_id,
      password: password,
    }).then((result) => {
      handleReset();
    });
  }
  function handleReset() {
    document.getElementById("input1").value = "";
  }

  return (
    <div className="Modal">
      <div className="ModalDataContent">
        <h1>{props.data.patient_name}</h1>
        <h1>{props.data.patient_blood_type}</h1>
        <form className="ModalPasswordForm" onSubmit={addPassword}>
          <label>Jelszó:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="input1"
          ></input>
          <button>Felvesz</button>
        </form>
        <button className="close-modal" onClick={props.onQuit}>
          X
        </button>
      </div>
    </div>
  );
}

function Patients() {
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [modalDataOn, setModalDataOn] = useState(false);
  const [modalPasswordOn, setModalPasswordOn] = useState(false);

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

  function openModalDataUp() {
    if (selected.patient_name) {
      setModalDataOn(true);
    } else {
      setModalDataOn(false);
    }
  }
  function closeModalData() {
    setModalDataOn(false);
  }
  function openModalPasswordUp() {
    if (selected.patient_name) {
      setModalPasswordOn(true);
    } else {
      setModalPasswordOn(false);
    }
  }
  function closeModalPassword() {
    setModalPasswordOn(false);
  }

  useEffect(() => {
    getPatients();
  }, []);

  function getPatients() {
    API.get("/patients").then((result) => {
      setPatients(result.data);
    });
  }

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

  function deletePatient(selected) {
    API.post("/delete-patient", {
      id: selected.patient_id,
    }).then((result) => {
      getPatients();
    });
  }

  function deleteAuth(selected) {
    API.post("/delete_Auth", {
      id: selected.patient_id,
    }).then((result) => {
      getPatients();
      deletePatient(selected);
    });
  }

  return (
    <div className="patients">
      <div className="patients-page">
        <div className="patients-top-container">
          <div className="patients-top-left"></div>
          <div className="patients-top-right">
            <button onClick={openModalUp} className="NewPatientBtn">
              Kiválaszt
            </button>
            <button onClick={navigatetoAddNew} className="NewPatientBtn">
              Új Páciens
            </button>

            <button onClick={openModalDataUp} className="NewPatientBtn">
              Új vérvétel
            </button>
            {modalDataOn && (
              <ModalData data={selected} onQuit={closeModalData} />
            )}
            <button onClick={openModalPasswordUp} className="NewPatientBtn">
              Új jelszó
            </button>
            {modalPasswordOn && (
              <ModalPassword data={selected} onQuit={closeModalPassword} />
            )}
            <input placeholder="Keresés" value={value} onChange={filterData} />
            {modalOn && <Modal data={selected} onQuit={closeModal} />}
          </div>
        </div>
        <div className="patients-mid-container">
          <div className="patients-left"> </div>
          <div className="patients-table-container">
            <table>
              <thead>
                <tr>
                  <th>Várcsoport</th>
                  <th>Név</th>
                  <th>Nem</th>
                  <th>Taj</th>
                  <th>Születési idő</th>
                  <th>Lakcím</th>
                  <th>Telefonszám</th>
                  <th>Email cím</th>
                  <th>Törlés</th>
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

                          <td>
                            <button
                              className="trashBtn"
                              onClick={() => deleteAuth(patient)}
                            >
                              <VscTrash />
                            </button>
                          </td>
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

                          <td>
                            <button
                              className="trashBtn"
                              onClick={() => deleteAuth(patient)}
                            >
                              <VscTrash />
                            </button>
                          </td>
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
