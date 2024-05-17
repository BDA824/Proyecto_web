import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditarPerfil.css';
import Main from "../Main/Main";
import img from '../images/account-profile.svg';
import { toast } from 'react-hot-toast';

export default function EditarPerfil() {
    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [pais, setPais] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const respuesta = await axios.get('http://localhost:8000');
                if (respuesta.status === 200) {
                    setUsuario(respuesta.data);
                    setNombre(respuesta.data.nombre || '');
                    setCorreo(respuesta.data.correo || '');
                    setPais(respuesta.data.pais || '');
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

    const handleUpdate = async () => {
        try {
            const updatedData = {
                id: usuario.id,
                nombre: nombre,
                correo: correo,
                pais: pais
            };

            await axios.post('http://localhost:8000/api/updateUser', updatedData);
            toast.success("Datos actualizados exitosamente.");
            navigate('/perfil'); // Redirige a la página de perfil después de la actualización
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar los datos del perfil.");
        }
    };

    return (
        <section className="editar-perfil">
            <div className="editar-perfil-header">
                <Main />
                <img src={img} alt="No se pudo cargar imagen" className="img-profile"/>
                <h1 className="editar-perfil-titulo">Editar Perfil</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="editar-perfil-info">
                    <label htmlFor="nombre" className="editar-perfil-label">Nombre:</label>
                    <input placeholder='Nombre' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="editar-perfil-info">
                    <label htmlFor="correo" className="editar-perfil-label">Correo Electrónico:</label>
                    <input placeholder='Correo' type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                </div>
                <div className="editar-perfil-info">
                    <label htmlFor="pais" className="editar-perfil-label">País:</label>
                    <input placeholder='País' type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
                </div>
                <button onClick={handleUpdate}>Guardar Cambios</button>
            </form>
        </section>
    );
}
