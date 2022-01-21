
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Login from './pages/Login';
import About from './pages/About';
import Github from './pages/Github';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/github' element={<Github/>} />
        </Routes>
      </BrowserRouter>
    </>

    
  );
}

export default App;