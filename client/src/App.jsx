import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Formulario from './Components/Formulario';
import Registro from './Components/Registro';
import Productos from './Productos/Productos'; // Importa el componente Productos

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Formulario />} />
        <Route path="/create-account" element={<Registro />} />
        <Route path="/Productos" element={<Productos />} /> {/* Ruta para el componente Productos */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
