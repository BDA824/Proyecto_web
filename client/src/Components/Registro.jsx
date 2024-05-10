import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './Registro.css';

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [pais, setPais] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [error, setError] = useState(false);
    const [contrasenasNoCoinciden, setContrasenasNoCoinciden] = useState(false); // Estado para manejar el error de contraseñas no coincidentes
    const navigate = useNavigate(); // Usa useNavigate para la navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre === "" || correo === "" || pais === "" || contraseña === "" || confirmarContraseña === "") {
            setError(true);
            return;
        }
        if (contraseña!== confirmarContraseña) {
            setContrasenasNoCoinciden(true); // Establece el estado para indicar que las contraseñas no coinciden
            return;
        }
        setError(false);
        setContrasenasNoCoinciden(false); // Restablece el estado para indicar que las contraseñas coinciden
        // Aquí iría la lógica para enviar los datos al servidor
        // Después de procesar los datos, redirige al usuario a la página de login
        navigate('/login'); // Navega a la página de login
    };

    return (
        <section className="Registro">
            <h1 className="Registro__titulo">Registro</h1>
            <form onSubmit={handleSubmit} className="Registro__form">
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required className="Registro__input" />
                <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo Electrónico" required className="Registro__input" />
                <input type="text" value={pais} onChange={e => setPais(e.target.value)} placeholder="País" required className="Registro__input" />
                <input type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Contraseña" required className="Registro__input" />
                <input type="password" value={confirmarContraseña} onChange={e => setConfirmarContraseña(e.target.value)} placeholder="Confirmar Contraseña" required className="Registro__input" />
                {error && <p>Por favor, completa todos los campos.</p>}
                {contrasenasNoCoinciden && <p>Las contraseñas no coinciden. Por favor, intenta de nuevo.</p>}
                <button type="submit" className="Registro__button">Registrarse</button>
            </form>
            <Link to="/login" className="link-registro">¿Ya tienes cuenta?</Link>
        </section>
    );
}
