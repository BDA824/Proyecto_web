import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import "./Registro.css";

export function Registro({ changeView }) {
    const [nombre, setNombre] = useState("");
    const [pais, setPais] = useState("");
    const [gmail, setGmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorPais, setErrorPais] = useState(false);
    const [errorGmail, setErrorGmail] = useState(false);
    const [errorContraseña, setErrorContraseña] = useState(false);
    const [errorContraseñasNoCoinciden, setErrorContraseñasNoCoinciden] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorNombre(false);
        setErrorPais(false);
        setErrorGmail(false);
        setErrorContraseña(false);
        setErrorContraseñasNoCoinciden(false);

        let hasError = false;
        if (nombre === "") {
            setErrorNombre(true);
            hasError = true;
        }
        if (pais === "") {
            setErrorPais(true);
            hasError = true;
        }
        if (gmail === "") {
            setErrorGmail(true);
            hasError = true;
        }
        if (contraseña === "") {
            setErrorContraseña(true);
            hasError = true;
        }
        if (contraseña !== confirmarContraseña) {
            setErrorContraseñasNoCoinciden(true);
            hasError = true;
        }

        if (!hasError) {
            navigate('/login');
        }        
    };

    return (
        <section className="Registro">
            <h1>Registro</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingrese un nombre" />
                {errorNombre && <p>El nombre es obligatorio.</p>}
                <input type="text" value={pais} onChange={e => setPais(e.target.value)} placeholder="Ingrese su país" />
                {errorPais && <p>El país es obligatorio.</p>}
                <input type="email" value={gmail} onChange={e => setGmail(e.target.value)} placeholder="Ingrese su correo electrónico" />
                {errorGmail && <p>El correo electrónico es obligatorio.</p>}
                <input type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Ingrese una contraseña"/>
                {errorContraseña && <p>La contraseña es obligatoria.</p>}
                <input type="password" value={confirmarContraseña} onChange={e => setConfirmarContraseña(e.target.value)} placeholder="Confirme su contraseña" />
                {errorContraseñasNoCoinciden && <p>Las contraseñas no coinciden.</p>}
                <button type="submit" className="button-link">Registrarse</button>
            </form>
        </section>
    );
}
