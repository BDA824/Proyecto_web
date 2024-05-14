import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from "../api/broker.api";
import './Registro.css';
import { toast } from 'react-hot-toast';

export default function Registro() {
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Usa useNavigate para la navegación
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {nombre, setNombre} = useState();

    const onSubmit = handleSubmit(async (data) => {
        // Validación adicional para asegurar que las contraseñas coincidan
        if (data.password!== data.confirmarPassword) {
            setError("Las contraseñas no coinciden. Por favor, intenta de nuevo.");
            toast.error("Las contraseñas no coinciden. Por favor, intenta de nuevo.");
            return;
        }

        try {
            await createUser(data);
            toast.success("Registro exitoso");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Vaciar todos los campos
                toast.error("El usuario ya existe");
            } else {
                // Vaciar todos los campos
                toast.error("Se produjo un error al procesar la solicitud");
            }
        }
    });

    return (
        <section className="Registro">
            <h1 className="Registro__titulo">Registro</h1>
            <form onSubmit={onSubmit} className="Registro__form">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Nombre"
                    value={nombre}
                    className="Registro__input"
                    {...register("name", { required: true })}
                />
                <input 
                    type="email" 
                    name="mail" 
                    placeholder="Correo Electrónico" 
                    className="Registro__input" 
                    {...register("mail", { required: true })}
                />
                <input 
                    type="text" 
                    name="country" 
                    placeholder="País" 
                    className="Registro__input"
                    {...register("country", { required: true })} 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    className="Registro__input"
                    {...register("password", { required: true })}
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    name="confirmarPassword" 
                    className="Registro__input" 
                    {...register("confirmarPassword", { required: true })}
                />
                {errors.confirmarPassword && <p>{errors.confirmarPassword.message}</p>}
                <button type="submit" className="Registro__button">Registrarse</button>
            </form>
            <Link to="/login" className="link-registro">¿Ya tienes cuenta?</Link>
        </section>
    );
}
