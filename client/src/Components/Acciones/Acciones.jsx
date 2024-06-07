import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Acciones.css';
import CardAction from '../Target-action/Card-action';
import Modal from '../Modal/Modal';
import { getActionsByCountry, saveTransactionToJSON, getUserWallet, joinBroker } from '../../api/broker.api'; // Agregado joinBroker
import { toast } from 'react-hot-toast';

const Acciones = () => {
    const [actions, setActions] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchActionsByCountry = async (countryId) => {
        try {
            const response = await getActionsByCountry(countryId);
            setActions(response.data);
        } catch (error) {
            console.error('Error fetching actions:', error);
            toast.error('Error al obtener acciones disponibles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBuyClick = (action) => {
        setSelectedAction(action);
        setShowModal(true);
    };

    const handleBuyAction = async (actionId) => {
        const userId = localStorage.getItem('userId');
        const userCountryId = localStorage.getItem('userCountryId');
        
        if (!userId || !userCountryId) {
            toast.error('Información de usuario no disponible');
            return;
        }
    
        try {
            await saveTransactionToJSON(userId, actionId, userCountryId);
            toast.success('Acción comprada con éxito');
            setShowModal(false);
            fetchActionsByCountry(userCountryId);
            updateUserWallet();
        } catch (error) {
            console.error('Error al comprar la acción:', error);
            toast.error('Error al comprar la acción');
        }
    };

    const updateUserWallet = async () => {
        try {
            const response = await getUserWallet(localStorage.getItem('userId'));
            console.log('Billetera del usuario:', response.data);
        } catch (error) {
            console.error('Error al obtener la billetera del usuario:', error);
        }
    };

    const handleJoinBroker = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('Información de usuario no disponible');
            return;
        }

        try {
            await joinBroker(userId); // Llamada a joinBroker para simular unirse al broker
            toast.success('Te has unido al broker exitosamente');
        } catch (error) {
            console.error('Error al unirse al broker:', error);
            toast.error('Error al unirse al broker');
        }
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
        <div className="acciones-container">
            <Main />
            <h1 className="title-actions">Acciones disponibles para comprar</h1>
            <div className="cards-container">
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    actions.map(action => (
                        <div className="card-complete" key={action.id}>
                            <CardAction name={action.name} value={action.value} />
                            <aside className="button-buy">
                                <button onClick={() => handleBuyClick(action)}>Comprar</button>
                            </aside>
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    action={selectedAction}
                    onBuy={handleBuyAction}
                    onJoinBroker={handleJoinBroker} // Agregado handleJoinBroker
                />
            )}
        </div>
    );
};

export default Acciones;
