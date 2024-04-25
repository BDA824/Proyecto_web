export default Formulario;
import "./Formulario.css"
import { useState } from "react"
import { Link } from "react-router-dom";

export function Formulario({changeView}){
    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)


    const handleSubmit = (e) =>{
        e.preventDefault()

        if(nombre === "" || contraseña === ""){
            setError(true)
            return
        }

        setError(false)

        setUser([nombre])
    }

    return(
        <section className="Formulario">
            <h1>Login</h1>

            <form className="formulario" onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre de usuario"/>
                <input type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} placeholder="Ingrese su contraseña"/>
                <button>Iniciar Sesion</button>
            </form>
            {error && <p>Todos los campos son obligatorios</p> }
            <span>Si no estás registrado, 
                <span className="link-registro">
                    <Link to="/create-account">Registrate</Link>
                </span></span>
        </section>
    )
}