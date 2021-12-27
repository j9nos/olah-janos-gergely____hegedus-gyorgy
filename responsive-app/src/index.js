import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedInRoute, LoggedOutRoute } from "./utils/ProtectedRoutes";

import "./global_styles.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Patient from "./pages/Patient/Patient";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<LoggedInRoute />}>
        <Route path="/patient" element={<Patient />} />
      </Route>
      <Route element={<LoggedOutRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
