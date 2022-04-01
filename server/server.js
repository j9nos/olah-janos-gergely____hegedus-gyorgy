const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PATIENT_SQL = require("./SQL_COMMANDS/PATIENT_SQL.json");
const DOCTOR_SQL = require("./SQL_COMMANDS/DOCTOR_SQL.json");
const CONFIG = require("./config.json");

/*
    //////////////////////////////
        SETUP
    //////////////////////////////
*/

const app = express();
app.use(express.json());
app.use(cors(CONFIG.cors));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createPool(CONFIG.mysql);

/*
    //////////////////////////////
        VERIFICATIONS
    //////////////////////////////
*/

function PATIENT_GUARD(req, res, next) {
  const token = cookieParser.JSONCookies(req.cookies).token;
  if (!token) {
    res.send("need a token");
  } else {
    jwt.verify(token, CONFIG.token.patientTokenSecret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed" });
      } else {
        req.patientId = decoded.patientId;
        next();
      }
    });
  }
}

function DOCTOR_GUARD(req, res, next) {
  const token = cookieParser.JSONCookies(req.cookies).token;
  if (!token) {
    res.send("need a token");
  } else {
    jwt.verify(token, CONFIG.token.doctorTokenSecret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed" });
      } else {
        req.patientId = decoded.patientId;
        next();
      }
    });
  }
}

/*
    //////////////////////////////
        API REQUESTS
    //////////////////////////////
*/

/*

  ===================================
  |                                 |
  |           PATIENT API           |           
  |                                 |
  ===================================


*/

app.post("/patient-authentication", (req, res) => {
  const taj = req.body.taj;
  const password = req.body.password;
  db.query(PATIENT_SQL.authentication, taj, (err, result) => {
    if (err) {
      res.send({ authed: false, message: "Szerver hiba" });
    } else if (result.length > 0) {
      bcrypt.compare(
        password,
        result[0].patient_password,
        (error, response) => {
          if (response) {
            const patientId = result[0].patient_id;
            const token = jwt.sign(
              { patientId },
              CONFIG.token.patientTokenSecret
            );
            res.cookie("token", token, {
              maxAge: CONFIG.token.lifeExpectancy,
            });
            res.send({ authed: true });
          } else {
            res.send({ authed: false, message: "Ellenőrizd az adatokat" });
          }
        }
      );
    } else {
      res.send({ authed: false, message: "Ellenőrizd az adatokat" });
    }
  });
});

app.get("/patient-profile-data", PATIENT_GUARD, (req, res) => {
  db.query(PATIENT_SQL.profileData, [req.patientId], (err, result) => {
    if (err) {
      res.send({ authed: false, message: "Szerver hiba" });
    } else {
      res.send(result[0]);
    }
  });
});

app.get("/patient-blood-test-dates", PATIENT_GUARD, (req, res) => {
  db.query(PATIENT_SQL.bloodTestDates, [req.patientId], (err, result) => {
    if (err) {
      res.send({ authed: false, message: "Szerver hiba" });
    } else {
      res.send(result);
    }
  });
});

app.post("/patient-blood-test-results", PATIENT_GUARD, (req, res) => {
  const date = req.body.date;
  db.query(
    PATIENT_SQL.bloodTestResults,
    [req.patientId, date],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/patient-blood-test-statistics", PATIENT_GUARD, (req, res) => {
  db.query(PATIENT_SQL.statistics, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/patient-blood-test-results", PATIENT_GUARD, (req, res) => {
  db.query(PATIENT_SQL.bloodTestResults, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.post("/patient-change-address", PATIENT_GUARD, (req, res) => {
  const newAddress = req.body.newAddress;
  db.query(
    PATIENT_SQL.changeAddress,
    [newAddress, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      } else {
        res.send({ message: "Lakcím megváltoztatva" });
      }
    }
  );
});
app.post("/patient-change-phone", PATIENT_GUARD, (req, res) => {
  const newPhone = req.body.newPhone;
  db.query(
    PATIENT_SQL.changePhone,
    [newPhone, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      } else {
        res.send({ message: "Telefonszám megváltoztatva" });
      }
    }
  );
});
app.post("/patient-change-email", PATIENT_GUARD, (req, res) => {
  const newEmail = req.body.newEmail;
  db.query(
    PATIENT_SQL.changeEmail,
    [newEmail, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      } else {
        res.send({ message: "E-mail cím megváltoztatva" });
      }
    }
  );
});

app.post("/patient-change-password", PATIENT_GUARD, (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  db.query(PATIENT_SQL.selectPassword, req.patientId, (qerr, qres) => {
    if (qerr) {
      res.send({ message: "Szerver hiba" });
    } else if (qres.length > 0) {
      bcrypt.compare(oldPassword, qres[0].patient_password, (berr, bres) => {
        if (bres) {
          bcrypt.hash(newPassword, 12, (berr2, bres2) => {
            db.query(
              PATIENT_SQL.changePassword,
              [bres2, req.patientId],
              (qerr2, qres2) => {
                if (qerr2) {
                  res.send({ message: "Szerver hiba" });
                } else {
                  res.send({ message: "Jelszó megváltoztatva" });
                }
              }
            );
          });
        } else {
          res.send({ message: "Nem ez a jelenlegi jelszavad" });
        }
      });
    } else {
      res.send({ message: "Szerver hiba" });
    }
  });
});

app.get("/patient-components", PATIENT_GUARD, (req, res) => {
  db.query(PATIENT_SQL.components, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

/*

  ===================================
  |                                 |
  |           DOCTOR API            |           
  |                                 |
  ===================================


*/

app.post("/doctor-authentication", (req, res) => {
  const license = req.body.license;
  const password = req.body.password;
  db.query(DOCTOR_SQL.authentication, license, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else if (result.length > 0) {
      bcrypt.compare(password, result[0].doctor_password, (error, response) => {
        if (response) {
          const doctorId = result[0].doctor_id;
          const token = jwt.sign({ doctorId }, CONFIG.token.doctorTokenSecret);
          res.cookie("token", token, {
            maxAge: CONFIG.token.lifeExpectancy,
          });
          res.send({ authed: true, message: "Sikeres belépés" });
        } else {
          res.send({ authed: false, message: "Hibás engedély vagy jelszó" });
        }
      });
    } else {
      res.send({ message: "Ilyen engedély nincs a rendszerben" });
    }
  });
});

app.get("/patients", DOCTOR_GUARD, (req, res) => {
  db.query(DOCTOR_SQL.allPatients, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.post("/selectPatient", DOCTOR_GUARD, (req, res) => {
  const id = req.body.id;
  db.query(DOCTOR_SQL.selectPatient, [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.post("/add-patient", DOCTOR_GUARD, (req, res) => {
  const name = req.body.name;
  const bloodType = req.body.bloodType;
  const gender = req.body.gender;
  const taj = req.body.taj;
  const birthdate = req.body.birthdate;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;

  db.query(
    DOCTOR_SQL.addPatient,
    [name, bloodType, gender, taj, birthdate, address, phone, email],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/delete-patient", DOCTOR_GUARD, (req, res) => {
  const id = req.body.id;
  db.query(DOCTOR_SQL.deletePatient, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_bloodtests_taken", DOCTOR_GUARD, (req, res) => {
  const id = req.body.id;

  db.query(DOCTOR_SQL.deleteBtaken, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_Auth", DOCTOR_GUARD, (req, res) => {
  const id = req.body.id;

  db.query(DOCTOR_SQL.deleteAuth, id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.post("/addPatientBloodTestData", DOCTOR_GUARD, (req, res) => {
  const componentId = req.body.componentId;
  const componentValue = req.body.componentValue;
  const id = req.body.id;
  const takenById = req.body.takenById;
  const takenDate = req.body.takenDate;

  db.query(
    DOCTOR_SQL.addBloodTestData,
    [componentId, componentValue, id, takenById, takenDate],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/addPassword", DOCTOR_GUARD, (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  bcrypt.hash(password, 12, (berr, bres) => {
    db.query(DOCTOR_SQL.addPassword, [bres, id], (err, result) => {
      res.send(result);
    });
  });
});

/*
    //////////////////////////////
      LISTENING
    //////////////////////////////
*/

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`////////////////////////////////////////////////////////////\n
  A SZERVER ITT FUT\thttp://localhost:${PORT}/
  \n////////////////////////////////////////////////////////////`);
});
