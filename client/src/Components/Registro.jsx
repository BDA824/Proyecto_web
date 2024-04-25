import React, { useState } from "react";
import "./Registro.css";

export function Registro({ changeView }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre === "" || contraseña === "" || confirmarContraseña === "") {
            setError(true);
            return;
        }

        if (contraseña !== confirmarContraseña) {
            setError(true);
            return;
        }

        setError(false);

        changeView('login');
    };


    return (
        <section className="Registro">
            <h1>Registro</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingrese un nombre" />
                <input type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Ingrese una contraseña"/>
                <input type="password" value={confirmarContraseña} onChange={e => setConfirmarContraseña(e.target.value)} placeholder="Confirme su contraseña" />
                <button type="submit">Registrarse</button>
            </form>
            {error && <p>Todos los campos son obligatorios y las contraseñas deben coincidir.</p>}
            
        </section>
    );
}
