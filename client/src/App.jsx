import React, { useState } from 'react';
import { Formulario } from './Components/Formulario';
import { Registro } from './Components/Registro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  // const [view, setView] = useState('login');

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Formulario />} />
        <Route path="/create-account" element={<Registro />} />
      </Routes>
      </BrowserRouter>
  );
  }

export default App;