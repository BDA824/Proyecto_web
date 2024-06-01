// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, action, onBuy, onJoin }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Comprar Acción</h2>
                <p>¿Deseas comprar la acción {action.name} por {action.value}?</p>
                <button onClick={() => onBuy(action.id)}>Comprar</button>
                <button onClick={onJoin}>Unirse a Gestora/Broker</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
