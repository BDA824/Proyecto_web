import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Formulario.css';
import { useForm } from 'react-hook-form';
import { loginUser } from "../../api/broker.api";
import { toast } from 'react-hot-toast';
import Main from "../Main/Main";

export default function Formulario() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm(); // Añade reset de useForm
    const [Password, setPassword] = useState("");
    
    const limpiarCampos = () => {
        setPassword('');
        reset(); // Resetea los valores de los campos del formulario
    };

    const onSubmit = handleSubmit(async (data) => {
        setError(false);
        try {
            await loginUser(data);
            toast.success("Bienvenido");
            navigate("/Productos");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Contraseña inválida");
                limpiarCampos();
            } else {
                toast.error("El usuario con este correo no ha sido encontrado");
                limpiarCampos();
            }
        }
    });

    return (
        <section className="Formulario"> 
            <h1 className="Formulario__titulo">Login</h1>
            <form onSubmit={onSubmit} className="Formulario__form">
                <input 
                    type="email"  
                    placeholder="Email" 
                    className="Formulario__input"
                    {...register("mail", { required: true })}
                />
                <input 
                    type="password"
                    placeholder="Contraseña" 
                    className="Formulario__input"
                    {...register("password", { required: true })} 
                />
                {error && <p>Por favor, completa todos los campos.</p>}
                <button type="submit" className="Formulario__button">Iniciar Sesión</button>
            </form>
            <Link to="/create-account" className="link-registro"> ¿No tienes cuenta?</Link>
        </section>
    );
}