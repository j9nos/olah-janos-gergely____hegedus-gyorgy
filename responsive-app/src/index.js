import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedInRoute, LoggedOutRoute } from "./utils/ProtectedRoutes";

import "./global_styles.css";

import Login from "./pages/Login";
import Patient from "./pages/Patient/Patient";

const Medicloud = () => {
  return (
    <Routes>
      <Route element={<LoggedInRoute />}>
        <Route path="/patient" element={<Patient />} />
      </Route>
      <Route element={<LoggedOutRoute />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Medicloud />
  </BrowserRouter>,
  document.getElementById("root")
);
