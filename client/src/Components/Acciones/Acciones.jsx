import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Acciones.css';
import CardAction from '../Target-action/Card-action';
import { getActionsByCountry } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Traders = () => {
    const [actions, setActions] = useState([]);

    const fetchActionsByCountry = async (countryId) => {
        try {
            const response = await getActionsByCountry(countryId);
            setActions(response.data);
        } catch (error) {
            console.error('Error fetching actions:', error);
            toast.error('Error al obtener acciones disponibles');
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
        <div className="traders-container">
            <Main />
            <h1 className="title-actions">Acciones disponibles para comprar</h1>
            <div className="cards-container">
                {actions.map(action => (
                    <div className="card-complete" key={action.id}>
                        <CardAction name={action.name} value={action.value} />
                        <aside className="button-buy">
                            <button>Comprar</button>
                        </aside>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Traders;
