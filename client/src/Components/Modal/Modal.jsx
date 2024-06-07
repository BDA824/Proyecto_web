import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const Modal = ({ show, onClose, action, onBuy, onJoinGestora, onJoinBroker }) => {
    if (!show) {
        return null;
    }

    const handleJoinGestora = () => {
        onJoinGestora();
        onClose(); // Cerrar el modal después de unirse a Gestora
    };

    const handleJoinBroker = () => {
        onJoinBroker();
        onClose(); // Cerrar el modal después de unirse a Broker
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Comprar Acción</h2>
                <p>¿Deseas comprar la acción {action.name} por {action.value}?</p>
                <button onClick={() => onBuy(action.id)}>Comprar</button>
                <div className="modal-actions">
                    <Link to="/gestoras">
                        <button className="join-button" onClick={handleJoinGestora}>Unirse a Gestora</button>
                    </Link>
                    <Link to="/brokers">
                        <button className="join-button" onClick={handleJoinBroker}>Unirse a Broker</button>
                    </Link>
                </div>
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
