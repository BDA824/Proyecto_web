import './Main.css';
import { Link } from "react-router-dom";
import { logoutUser } from '../../api/broker.api';

export default function Main() {
    const handleLogout = () => {
        logoutUser().then(() => {
            window.location.href = "/login";
        }).catch(error => {
            console.error("Error al cerrar sesión:", error);
        });
    };

    return (
        <div className='center'>
            <section className='header-page'>
                <Link className='redirect-page' to='/Profile'>Perfil</Link>
                <Link className='redirect-page' to='/EditarPerfil'>Actualizar datos</Link>
                <Link className='redirect-page' to='/login'>Cambiar contraseña</Link>
                <Link className='redirect-page' to='/login' style={{float: 'right'}}>Cerrar sesión</Link>
                <span className='redirect-options-view'>
                    <Link className='redirect-view' to='/traders'>Para traders</Link>
                    <Link className='redirect-view' to='/wallet'>Mi billetera</Link>
                    <Link className='redirect-view' to='/About-us'>Quienes somos</Link>
                </span>
            </section>
        </div>
    );
}
