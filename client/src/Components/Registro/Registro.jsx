import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from "../../api/broker.api";
import './Registro.css';
import { toast } from 'react-hot-toast';
import Main from "../Main/Main";
import img from '../images/account-profile.svg';

export default function Registro() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [nombre, setNombre] = useState("");

    const limpiarCampos = () => {
        reset();
        setNombre("");
    };
    

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmarPassword) {
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
                toast.error("El usuario ya existe. Por favor, intenta con otro nombre de usuario.");
            } else {
                toast.error("Se produjo un error al procesar la solicitud. Por favor, inténtalo nuevamente más tarde.");
            }
        } finally {
            if (!error) {
                limpiarCampos();
            }
        }
    });

    return (
        <section className="Registro">
            <img src={img} alt="No se pudo cargar imagen" className="img-profile" />
            <h2>Registrarse</h2>
            <form onSubmit={onSubmit} className="Registro__form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
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

                <select name="pais" id="pais" className="Registro__input" {...register("pais", { required: true })}>
                    <option value="">Seleccione un país</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Perú">Perú</option>
                    <option value="México">México</option>
                </select>

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
