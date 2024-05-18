import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChangePassword.css';
import Main from "../Main/Main";
import img from '../images/account-profile.svg';
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
            const response = await axios.put('http://localhost:8000/api/change_password/', {
                old_password: oldPassword,
                new_password: newPassword
            }, {
                withCredentials: true  // Asegura que las cookies de la sesión se envíen con la solicitud
            });

            if (response.data.status === 'success') {
                toast.success("Contraseña cambiada exitosamente.");
                navigate('/Profile');
            } else {
                toast.error(response.data.message || "Error al cambiar la contraseña.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al cambiar la contraseña.");
        }
    };

    return (
        <section className="change-password">
            <div className="change-password-header">
            <img src={img} alt="No se pudo cargar imagen" className="img-profile3"/>
                <Main />
                <h1 className="change-password-title">Cambiar Contraseña</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="change-password-info">
                    <label htmlFor="oldPassword" className="change-password-label">Contraseña Antigua:</label>
                    <input 
                        placeholder='Contraseña Antigua' 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="change-password-info">
                    <label htmlFor="newPassword" className="change-password-label">Nueva Contraseña:</label>
                    <input 
                        placeholder='Nueva Contraseña' 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="change-password-info">
                    <label htmlFor="confirmPassword" className="change-password-label">Confirmar Nueva Contraseña:</label>
                    <input 
                        placeholder='Confirmar Nueva Contraseña' 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button onClick={handleChangePassword}>Cambiar Contraseña</button>
            </form>
        </section>
    );
}
