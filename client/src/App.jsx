import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Formulario from './Components/Formulario';
import Registro from './Components/Registro';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Formulario />} />
        <Route path="/create-account" element={<Registro />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
