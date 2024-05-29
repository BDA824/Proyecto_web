import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChangePassword.css';
import Main from "../Main/Main";
import img from "../images/Icono.svg";
import { toast } from 'react-hot-toast';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                toast.error("No se encontró el ID de usuario.");
                return;
            }

            const response = await axios.put(`http://localhost:8000/broker/api/v1/users/${userId}/change-password/`, {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                toast.success("Contraseña cambiada exitosamente.");
                navigate('/Profile');
            } else {
                toast.error(response.data.message || "Error al cambiar la contraseña.");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Error al cambiar la contraseña.");
        }
    };

    return (
        <section className="change-password">
            <div className="change-password-header">
                <img src={img} alt="No se pudo cargar imagen" className="img-profile3" />
                <Main />
                <h1 className="change-password-title">Cambiar Contraseña</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="change-password-info">
                    <label htmlFor="oldPassword" className="change-password-label">Contraseña antigua:</label>
                    <input 
                        placeholder='Contraseña antigua' 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="change-password-info">
                    <label htmlFor="newPassword" className="change-password-label">Nueva contraseña:</label>
                    <input 
                        placeholder='Nueva contraseña' 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="change-password-info">
                    <label htmlFor="confirmPassword" className="change-password-label">Confirmar nueva contraseña:</label>
                    <input 
                        placeholder='Confirmar nueva contraseña' 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button onClick={handleChangePassword}>Cambiar contraseña</button>
            </form>
        </section>
    );
}
