import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from "../Main/Main";
import './Profile.css';
import img from '../images/account-profile.svg';
import { toast } from 'react-hot-toast';

export default function Perfil() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!token || !userId) {
                    console.error('Token o ID de usuario no disponible');
                    toast.error('Token o ID de usuario no disponible');
                    navigate('/login');
                    return;
                }

                const respuesta = await axios.get(`http://localhost:8000/broker/api/v1/users/${userId}/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                console.log('Datos del usuario:', respuesta.data); // Depuración
                setUsuario(respuesta.data);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
                toast.error('Error al obtener el perfil del usuario');
                navigate('/login');
            }
        };

        obtenerPerfil();
    }, [navigate]);

    if (!usuario) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <section className="Profile">
            <div className="Profile-header">
                <Main />
                <img src={img} alt="No se pudo cargar imagen" className="img-profile"/>
                <h1 className="Profile__titulo">Perfil</h1>
            </div>
            <div className="Profile__info">
                <label htmlFor="nombre" className="Profile__label">Nombre:</label>
                <span className="Profile__value">{usuario.name}</span>
            </div>
            <div className="Profile__info">
                <label htmlFor="correo" className="Profile__label">Correo Electrónico:</label>
                <span className="Profile__value">{usuario.mail}</span>
            </div>
            <div className="Profile__info">
                <label htmlFor="pais" className="Profile__label">País:</label>
                <span className="Profile__value">{usuario.country}</span>
            </div>
        </section>
    );
}
