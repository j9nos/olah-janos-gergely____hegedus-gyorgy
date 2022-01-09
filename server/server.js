const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const COOKIE_LIFE_EXPECTANCY = 3600000;
const TOKEN_SECRET = ")J@NcRfUjXn2r4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$BE)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfTjWmZq4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D(G+KbPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)J@NcRfUjWnZr4u7x!A%D*G-KaPdSgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6w9z$C&F)J@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F";
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
    //
        API REQUESTS
    //
*/

app.post("/patientLogin", (req, res) => {
  const taj = req.body.taj;
  const password = req.body.password;
  const authCOMMAND = "SELECT * FROM patients WHERE patient_taj = ?;";
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
            const token = jwt.sign({ patientId }, TOKEN_SECRET);
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

function verifyToken(req, res, next) {
  const token = cookieParser.JSONCookies(req.cookies).token;
  if (!token) {
    res.send("need a token");
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed" });
      } else {
        req.patientId = decoded.patientId;
        next();
      }
    });
  }
}

app.get("/basicPatientData", verifyToken, (req, res) => {
  const selectCOMMAND = "SELECT * FROM patients WHERE patient_id = ?;";
  db.query(selectCOMMAND, [req.patientId], (err, result) => {
    res.send(result[0]);
  });
});

app.get("/patientBloodTestDates", verifyToken, (req, res) => {
  const selectCOMMAND =
    "SELECT blood_tests_taken_date FROM blood_tests_taken WHERE blood_tests_taken_from_id = ? GROUP BY blood_tests_taken_date;";
  db.query(selectCOMMAND, [req.patientId], (err, result) => {
    res.send(result);
  });
});

app.post("/patientBloodTestResults", verifyToken, (req, res) => {
  const selectCOMMAND =
    "SELECT blood_test_components.blood_test_component_abbreviation, blood_test_components.blood_test_component_name, blood_test_components.blood_test_component_measurement, blood_test_components.blood_test_component_normal_range, blood_test_components.blood_test_component_description, blood_tests_taken.blood_tests_component_value, doctors.doctor_name FROM blood_test_components INNER JOIN blood_tests_taken ON blood_test_components.blood_test_component_id = blood_tests_taken.blood_tests_component_id INNER JOIN doctors ON blood_tests_taken.blood_tests_taken_by_id = doctors.doctor_id WHERE blood_tests_taken.blood_tests_taken_from_id = ? AND blood_tests_taken.blood_tests_taken_date = ?;";
  db.query(selectCOMMAND, [req.patientId, req.body.date], (err, result) => {
    res.send(result);
  });
});

app.get("/showmecookie", (req, res) => {
  console.log(req.cookies.token);
  res.send();
});

app.listen(PORT, () => {
  console.log(`FUT : http://localhost:${PORT}/`);
});
