import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Login from "./pages/Login";
import About from "./pages/About";
import Github from "./pages/Github";

import { LoggedInRoute, LoggedOutRoute } from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/about" element={<About />} />
        <Route path="/github" element={<Github />} />

        <Route element={<LoggedInRoute />}>
          <Route path="/"element={<Home />} />
          <Route path="/patients" element={<Patients />} />
        </Route>

        <Route element={<LoggedOutRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
