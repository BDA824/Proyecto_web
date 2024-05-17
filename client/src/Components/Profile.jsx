import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Main from "./Main";
import './Profile.css';
import img from '../images/account-profile.svg';
import { toast } from 'react-hot-toast';

export default function Perfil() {
    const [usuario, setUsuario] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000');
                if (respuesta.status === 200) {
                    setUsuario(respuesta.data);
                } else {
                    throw new Error('Error al cargar los datos del perfil.');
                }
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar los datos del perfil.");
            }
        };
        fetchUsuario();
    }, []);

    return (
        <section className="Profile">
            <div className="Profile-header">
                <Main />
                <img src={img} alt="No se pudo cargar imagen" className="img-profile"/>
                <h1 className="Profile__titulo">Perfil</h1>
            </div>
            <div className="Profile__info">
                <label htmlFor="nombre" className="Profile__label">Nombre:</label>
                <span>{Object.keys(usuario).length > 0? usuario.nombre : ''}</span>
            </div>
            <div className="Profile__info">
                <label htmlFor="correo" className="Profile__label">Correo Electrónico:</label>
                <span>{Object.keys(usuario).length > 0? usuario.correo : ''}</span>
            </div>
        </section>
    );
}
