import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from "../Main/Main";
import './Profile.css';
import img from '../images/account-profile.svg';
import { toast } from 'react-hot-toast';

export default function Perfil({ data }) {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();
    console.log(data)
    return (
        <section className="Profile">
            <div className="Profile-header">
                <Main />
                <img src={img} alt="No se pudo cargar imagen" className="img-profile"/>
                <h1 className="Profile__titulo">Perfil</h1>
            </div>
            <div className="Profile__info">
                <label htmlFor="nombre" className="Profile__label">Nombre:</label>
                <span>Camil</span>
            </div>
            <div className="Profile__info">
                <label htmlFor="correo" className="Profile__label">Correo Electrónico:</label>
                <span>Camil</span>
            </div>
            <div className="Profile__info">
                <label htmlFor="pais" className="Profile__label">País:</label>
                <span>Camil</span>
            </div>
        </section>
    );
}
