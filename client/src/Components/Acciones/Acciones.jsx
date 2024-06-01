import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Acciones.css';
import CardAction from '../Target-action/Card-action';
import Modal from '../Modal/Modal';
import { getActionsByCountry, getGestorasByCountry, getBrokersByCountry } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Traders = () => {
    const [actions, setActions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchActionsByCountry = async (countryId) => {
        try {
            const response = await getActionsByCountry(countryId);
            setActions(response.data);
        } catch (error) {
            console.error('Error fetching actions:', error);
            toast.error('Error al obtener acciones disponibles');
        }
    };

    const handleBuyClick = (action) => {
        setSelectedAction(action);
        setShowModal(true);
    };

    const handleBuyAction = async (actionId) => {
        // Lógica para comprar la acción
        console.log('Comprando acción con id:', actionId);
        toast.success('Acción comprada con éxito');
        setShowModal(false);
    };

    const handleJoinGestoraBroker = async () => {
        const userCountryId = localStorage.getItem('userCountryId');
        if (userCountryId) {
            try {
                const gestorasResponse = await getGestorasByCountry(userCountryId);
                const brokersResponse = await getBrokersByCountry(userCountryId);
                const gestoras = gestorasResponse.data;
                const brokers = brokersResponse.data;
                console.log('Gestoras disponibles:', gestoras);
                console.log('Brokers disponibles:', brokers);
                toast.success('Unido a gestora/broker con éxito');
            } catch (error) {
                console.error('Error fetching gestoras/brokers:', error);
                toast.error('Error al unirse a gestora/broker');
            }
        }
        setShowModal(false);
    };

    useEffect(() => {
        const userCountryId = localStorage.getItem('userCountryId');
        if (userCountryId) {
            fetchActionsByCountry(userCountryId);
        }

        const handleStorageChange = () => {
            const updatedCountryId = localStorage.getItem('userCountryId');
            if (updatedCountryId) {
                fetchActionsByCountry(updatedCountryId);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="traders-container">
            <Main />
            <h1 className="title-actions">Acciones disponibles para comprar</h1>
            <div className="cards-container">
                {actions.map(action => (
                    <div className="card-complete" key={action.id}>
                        <CardAction name={action.name} value={action.value} />
                        <aside className="button-buy">
                            <button onClick={() => handleBuyClick(action)}>Comprar</button>
                        </aside>
                    </div>
                ))}
            </div>
            {selectedAction && (
                <Modal 
                    show={showModal} 
                    onClose={() => setShowModal(false)} 
                    action={selectedAction}
                    onBuy={handleBuyAction}
                    onJoin={handleJoinGestoraBroker}
                />
            )}
        </div>
    );
};

export default Traders;
