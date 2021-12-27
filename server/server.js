const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const COOKIE_LIFE_EXPECTANCY = 3600000;
const TOKEN_SECRET = "lejonkanklattraitrad";
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

app.get("/showmecookie", (req, res) => {
  console.log(req.cookies.token);
  res.send();
});

app.listen(PORT, () => {
  console.log(`FUT : http://localhost:${PORT}/`);
});
