const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
const PORT = 3001;

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
  const authCOMMAND =
    "SELECT patients.patient_id, patient_authentication.patient_password FROM patient_authentication INNER JOIN patients ON patient_authentication.patient_authentication_fid = patients.patient_id WHERE patients.patient_taj = ?;";
  db.query(authCOMMAND, taj, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
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
            res.send({ authed: true, message: "Sikeres belépés" });
          } else {
            res.send({ authed: false, message: "Hibás tajkártya vagy jelszó" });
          }
        }
      );
    } else {
      res.send({ message: "Ilyen tajkártya nincs a rendszerben" });
    }
  });
});

app.get("/patient-profile-data", verifyPatient, (req, res) => {
  const selectCOMMAND = "SELECT * FROM patients WHERE patient_id = ?;";
  db.query(selectCOMMAND, [req.patientId], (err, result) => {
    res.send(result[0]);
  });
});

app.get("/patient-profile-data", verifyPatient, (req, res) => {
  const selectCOMMAND = "SELECT * FROM patients WHERE patient_id = ?;";
  db.query(selectCOMMAND, [req.patientId], (err, result) => {
    res.send(result[0]);
  });
});

app.get("/patient-blood-test-dates", verifyPatient, (req, res) => {
  const selectCOMMAND =
    "SELECT blood_tests_taken_date FROM blood_tests_taken WHERE blood_tests_taken_from_id = ? GROUP BY blood_tests_taken_date;";
  db.query(selectCOMMAND, [req.patientId], (err, result) => {
    res.send(result);
  });
});

app.post("/patientBloodTestResults", verifyPatient, (req, res) => {
  const selectCOMMAND =
    "SELECT blood_test_components.blood_test_component_name, blood_test_components.blood_test_component_measurement, blood_test_components.blood_test_component_normal_range, blood_test_components.blood_test_component_description, blood_tests_taken.blood_tests_component_value, doctors.doctor_name FROM blood_test_components INNER JOIN blood_tests_taken ON blood_test_components.blood_test_component_id = blood_tests_taken.blood_tests_component_id INNER JOIN doctors ON blood_tests_taken.blood_tests_taken_by_id = doctors.doctor_id WHERE blood_tests_taken.blood_tests_taken_from_id = ? AND blood_tests_taken.blood_tests_taken_date = ?;";
  db.query(selectCOMMAND, [req.patientId, req.body.date], (err, result) => {
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
  const authCOMMAND =
    "SELECT doctors.doctor_id, doctor_authentication.doctor_password FROM doctor_authentication INNER JOIN doctors ON doctor_authentication.doctor_authentication_fid = doctors.doctor_id WHERE doctors.doctor_license = ?;";
  db.query(authCOMMAND, license, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      
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
  const selectCOMMAND =
    "SELECT * FROM patients";
  db.query(selectCOMMAND,(err, result) => {
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

  const insertCOMMAND = "INSERT INTO patients(patient_name,patient_blood_type,patient_gender,patient_taj,patient_birthdate,patient_address,patient_phone,patient_email) VALUES(?,?,?,?,?,?,?,?)";

  
  db.query(insertCOMMAND, [name,bloodType,gender,taj,birthdate,address,phone,email], (err, result) => {

    res.send(result);
  
  });

});




app.listen(PORT, () => {
  console.log(`////////////////////////////////////////////////////////////\n
  A SZERVER ITT FUT\thttp://localhost:${PORT}/
  \n////////////////////////////////////////////////////////////`);
});
