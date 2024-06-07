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
                <div>
                    <Link className='redirect-page' to='/Profile'>Perfil</Link>
                    <Link className='redirect-page' to='/EditarPerfil'>Actualizar datos</Link>
                    <Link className='redirect-page' to='/ChangePassword'>Cambiar contraseña</Link>
                </div>
                <span className='redirect-options-view'>
                    <Link className='redirect-view' to='/Acciones'>Acciones</Link>
                    <Link className='redirect-view' to='/Gestoras'>Gestoras</Link>
                    <Link className='redirect-view' to='/Brokers'>Brokers</Link>
                    <Link className='redirect-view' to='/wallet'>Mi billetera</Link>
                    <Link className='redirect-view' to='/About-us'>Quienes somos</Link>
                </span>
                <div className="portfolio-experiment">
                    <a onClick={handleLogout}>
                        <span className="text">Cerrar sesión</span>
                        <span className="line -right"></span>
                        <span className="line -top"></span>
                        <span className="line -left"></span>
                        <span className="line -bottom"></span>
                    </a>
                </div>
            </section>
        </div>
    );
}
