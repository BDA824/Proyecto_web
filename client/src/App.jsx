import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Formulario from './Components/Login/Formulario';
import Registro from './Components/Registro/Registro';
import Productos from './Productos/Productos';
import {Toaster} from 'react-hot-toast'
import Main from './Components/Main/Main';
import Profile from './Components/Profile/Profile'
import AboutUsPage from './Components/About-us/AboutUs';
import TradersPage from './Components/Traders/Traders';
import WalletPage from './Components/Wallet/Wallet';
import EditarPerfil from './Components/EditarPerfil/EditarPerfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Formulario />} />
        <Route path="/create-account" element={<Registro />} />
        <Route path="/EditarPerfil" element={<EditarPerfil />} />
        <Route path="/home" element={<Main />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/About-us" element={<AboutUsPage />} /> 
        <Route path="/Traders" element={<TradersPage />} />
        <Route path="/Wallet" element={<WalletPage />} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
