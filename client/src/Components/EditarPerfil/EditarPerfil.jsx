import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditarPerfil.css';
import Main from "../Main/Main";
import img from '../images/account-profile.svg';
import { toast } from 'react-hot-toast';

export default function EditarPerfil() {
    const [userData, setUserData] = useState({});
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pais, setPais] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!token || !userId) {
                    throw new Error('Token o ID de usuario no disponible');
                }

                const respuesta = await axios.get(`http://localhost:8000/broker/api/v1/users/${userId}/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });

                const userData = respuesta.data;
                setUserData(userData);
                setNombre(userData.name);
                setCorreo(userData.mail);
                setPais(userData.country);
            } catch (error) {
                console.error(error);
                toast.error("Error al cargar los datos del perfil.");
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        try {
            const updatedData = {
                name: nombre,
                country: pais
            };
    
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
    
            if (!token || !userId) {
                throw new Error('Token o ID de usuario no disponible');
            }
    
            await axios.patch(`http://localhost:8000/broker/api/v1/users/${userId}/`, updatedData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
    
            toast.success("Datos actualizados exitosamente.");
            navigate('/Profile'); // Redirige a la página de perfil después de la actualización
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar los datos del perfil.");
        }
    };
    
    return (
        <section className="editar-perfil">
            <div className="editar-perfil-header">
                <Main />
                <img src={img} alt="No se pudo cargar imagen" className="img-profile2"/>
                <h1 className="editar-perfil-titulo">Editar Perfil</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="editar-perfil-info">
                    <label htmlFor="nombre" className="editar-perfil-label">Nombre:</label>
                    <input placeholder='Nombre' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="editar-perfil-info">
                    <label htmlFor="correo" className="editar-perfil-label">Correo Electrónico:</label>
                    <input placeholder='Correo' type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} disabled />
                </div>
                <div className="editar-perfil-info">
                    <label htmlFor="pais" className="editar-perfil-label">País:</label>
                    <select value={pais} onChange={(e) => setPais(e.target.value)} required>
                        <option value="">Seleccionar país</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Chile">Chile</option>
                        <option value="Peru">Perú</option>
                        <option value="Mexico">México</option>
                    </select>
                </div>
                <button onClick={handleUpdate}>Guardar Cambios</button>
            </form>
        </section>
    );
}
