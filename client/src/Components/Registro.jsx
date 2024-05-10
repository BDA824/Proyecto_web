import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { createUser } from "../api/broker.api";
import './Registro.css';
import {toast} from 'react-hot-toast'

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [pais, setPais] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const navigate = useNavigate(); // Usa useNavigate para la navegación
    const {register, handleSubmit, formState: {
        errors
    }} = useForm()

    const onSubmit = handleSubmit(async (data) => {
        await createUser(data);
        toast.success("Registro exitoso")
        navigate("/login")

    })
    return (
        <section className="Registro">
            <h1 className="Registro__titulo">Registro</h1>
            <form onSubmit={onSubmit} className="Registro__form">
                <input 
                type="text" 
                name="name" 
                placeholder="Nombre" 
                className="Registro__input" 
                {...register("name", {required: true})}
                />
                <input 
                type="email" 
                name="mail" 
                placeholder="Correo Electrónico" 
                className="Registro__input" 
                {...register("mail", {required: true})}
                />
                <input 
                type="text" 
                name="country" 
                placeholder="País" 
                className="Registro__input"
                {...register("country", {required: true})} 
                />
                <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                className="Registro__input"
                {...register("password", {required: true})} 
                />
                <input 
                type="password" 
                placeholder="Confirmar Contraseña" 
                name="confirmarPassword" 
                className="Registro__input" 
                />
                <button type="submit" className="Registro__button">Registrarse</button>
            </form>
            <Link to="/login" className="link-registro">¿Ya tienes cuenta?</Link>
        </section>
    );
}
