const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const PATIENT_SQL = require("./SQL_COMMANDS/PATIENT_SQL.json");
const DOCTOR_SQL = require("./SQL_COMMANDS/DOCTOR_SQL.json");

/*
    //////////////////////////////
        SETUP
    //////////////////////////////
*/

const COOKIE_LIFE_EXPECTANCY = 3600000;
const PATIENT_TOKEN_SECRET =
  "e4a874356cbe44ce796ba1c4f5af379d63d3d70ad3105188e735df4667c5dce4fedec1107a99ab91014749c6ad68cb50bc52597a374631e13d3dde946674b0a4f3a403a6692b4e64ddf773d3e5b837b3";
const DOCTOR_TOKEN_SECRET =
  ")J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$BE)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "medicloud",
  timezone: "+00:00",
});

/*
    //////////////////////////////
        VERIFICATIONS
    //////////////////////////////
*/

function verifyPatient(req, res, next) {
  const token = cookieParser.JSONCookies(req.cookies).token;
  if (!token) {
    res.send("need a token");
  } else {
    jwt.verify(token, PATIENT_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed" });
      } else {
        req.patientId = decoded.patientId;
        next();
      }
    });
  }
}

function verifyDoctor(req, res, next) {
  const token = cookieParser.JSONCookies(req.cookies).token;
  if (!token) {
    res.send("need a token");
  } else {
    jwt.verify(token, DOCTOR_TOKEN_SECRET, (err, decoded) => {
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
            const token = jwt.sign({ patientId }, PATIENT_TOKEN_SECRET);
            res.cookie("token", token, {
              maxAge: COOKIE_LIFE_EXPECTANCY,
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

app.get("/patient-profile-data", verifyPatient, (req, res) => {
  db.query(PATIENT_SQL.profileData, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result[0]);
  });
});

app.get("/patient-blood-test-dates", verifyPatient, (req, res) => {
  db.query(PATIENT_SQL.bloodTestDates, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.post("/patient-blood-test-results", verifyPatient, (req, res) => {
  const date = req.body.date;
  db.query(
    PATIENT_SQL.bloodTestResults,
    [req.patientId, date],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});

app.get("/patient-blood-test-statistics", verifyPatient, (req, res) => {
  db.query(PATIENT_SQL.statistics, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.get("/patient-blood-test-results", verifyPatient, (req, res) => {
  db.query(PATIENT_SQL.bloodTestResults, [req.patientId], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.post("/patient-change-address", verifyPatient, (req, res) => {
  const newAddress = req.body.newAddress;
  db.query(
    PATIENT_SQL.changeAddress,
    [newAddress, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      }
      res.send({ message: "Lakcím megváltoztatva" });
    }
  );
});
app.post("/patient-change-phone", verifyPatient, (req, res) => {
  const newPhone = req.body.newPhone;
  db.query(
    PATIENT_SQL.changePhone,
    [newPhone, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      }
      res.send({ message: "Telefonszám megváltoztatva" });
    }
  );
});
app.post("/patient-change-email", verifyPatient, (req, res) => {
  const newEmail = req.body.newEmail;
  db.query(
    PATIENT_SQL.changeEmail,
    [newEmail, req.patientId],
    (err, result) => {
      if (err) {
        res.send({ message: "Szerver hiba" });
      }
      res.send({ message: "E-mail cím megváltoztatva" });
    }
  );
});

app.post("/patient-change-password", verifyPatient, (req, res) => {
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

app.get("/patient-components", verifyPatient, (req, res) => {
  db.query(PATIENT_SQL.components, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.get("/showmecookie", (req, res) => {
  console.log(req.cookies.token);
  res.send();
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
          const token = jwt.sign({ doctorId }, DOCTOR_TOKEN_SECRET);
          res.cookie("token", token, {
            maxAge: COOKIE_LIFE_EXPECTANCY,
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

app.get("/patients", verifyDoctor, (req, res) => {
  db.query(DOCTOR_SQL.allPatients, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});

app.post("/selectPatient", verifyDoctor, (req, res) => {
  const id = req.body.id;
  console.log(id);
  db.query(DOCTOR_SQL.selectPatient, [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/add-patient", verifyDoctor, (req, res) => {
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

app.post("/delete-patient", verifyDoctor, (req, res) => {
  const id = req.body.id;
  db.query(DOCTOR_SQL.deletePatient, id, (err, result) => {
    if (err) {
      res.send({err:err});
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_bloodtests_taken", verifyDoctor, (req, res) => {
  const id = req.body.id;
  
  db.query(DOCTOR_SQL.deleteBtaken, id, (err, result) => {
    if (err) {
      res.send({err:err});
    } else {
      res.send(result);
    }
  });
});

app.post("/delete_Auth", verifyDoctor, (req, res) => {
  const id = req.body.id;
  
  db.query(DOCTOR_SQL.deleteAuth, id, (err, result) => {
    if (err) {
      res.send({err:err});
    } else {
      res.send(result);
    }
  });
});

app.post("/addPatientBloodTestData", verifyDoctor, (req, res) => {
  const componentId = req.body.componentId;
  console.log(componentId);
  const componentValue = req.body.componentValue;
  console.log(componentValue);


  const id = req.body.id;
  console.log(id);


  const takenById = req.body.takenById;
  console.log(takenById);
  const takenDate = req.body.takenDate;
  console.log(takenDate)

  db.query(
    DOCTOR_SQL.addBloodTestData,
    [componentId,componentValue,id,takenById,takenDate],
    (err, result) => {
      res.send(result);
    }
  );
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
