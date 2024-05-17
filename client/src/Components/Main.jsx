import './Main.css'
import { Link, useLocation } from "react-router-dom";

export default function Main() {
    return (
        <div className='center'>
            <section className='header-page'>
                <Link className='redirect-page' to='/create-account'>Perfil</Link>
                <Link className='redirect-page' to='/login'>Actualizar datos</Link>
                <Link className='redirect-page' to='/login'>Cambiar contraseña</Link>
                <span className='redirect-options-view'>
                    <Link className='redirect-view'>Para traders</Link>
                    <Link className='redirect-view'>Mi billetera</Link>
                    <Link className='redirect-view'>Quienes somos</Link>
                </span>
            </section>
        </div>
    );
}