import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Formulario.css';

export default function Formulario() {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }
        setError(false);
        
    };

    return (
        <section className="Formulario">
            <h1 className="Formulario__titulo">Login</h1>
            <form onSubmit={handleSubmit} className="Formulario__form">
                <input type="email" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Email" required className="Formulario__input" />
                <input type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Contraseña" required className="Formulario__input" />
                {error && <p>Por favor, completa todos los campos.</p>}
                <button type="submit" className="Formulario__button">Iniciar Sesión</button>
            </form>
            <Link to="/create-account" className="link-registro"> ¿No tienes cuenta?</Link>
        </section>
    );
}
