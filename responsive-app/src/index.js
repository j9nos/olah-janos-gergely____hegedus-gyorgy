import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoggedInRoute, LoggedOutRoute } from "./utils/ProtectedRoutes";

import "./index.css";

import LOGIN from "./pages/login/LOGIN";
import PATIENT from "./pages/patient/PATIENT";

const MEDICLOUD = () => {
  return (
    <Routes>
      <Route element={<LoggedInRoute />}>
        <Route path="/" element={<PATIENT />} />
      </Route>
      <Route element={<LoggedOutRoute />}>
        <Route path="/login" element={<LOGIN />} />
      </Route>
    </Routes>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <MEDICLOUD />
  </BrowserRouter>,
  document.getElementById("root")
);
