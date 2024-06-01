import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Gestoras.css';
import CardGestoras from '../Tarjet-gestoras/Card-gestoras';
import { getGestorasByCountry, joinGestora } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Gestora = () => {
    const [gestoras, setGestoras] = useState([]);

    const fetchGestorasByCountry = async (countryId) => {
        try {
            const response = await getGestorasByCountry(countryId);
            setGestoras(response.data);
        } catch (error) {
            console.error('Error fetching gestoras:', error);
            toast.error('Error al obtener gestoras disponibles');
        }
    };

    const handleJoinGestora = async (gestoraId) => {
        try {
            const userId = localStorage.getItem('userId');
            await joinGestora(userId, gestoraId);
            toast.success('Unido a la gestora exitosamente');
        } catch (error) {
            console.error('Error joining gestora:', error);
            toast.error('Error al unirse a la gestora');
        }
    };

    useEffect(() => {
        const userCountryId = localStorage.getItem('userCountryId');
        if (userCountryId) {
            fetchGestorasByCountry(userCountryId);
        }

        const handleStorageChange = () => {
            const updatedCountryId = localStorage.getItem('userCountryId');
            if (updatedCountryId) {
                fetchGestorasByCountry(updatedCountryId);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="gestoras-container">
            <Main />
            <h1 className="title-gestoras">Gestoras disponibles</h1>
            <div className="cards-container">
                {gestoras.map(gestora => (
                    <div className="card-complete" key={gestora.id}>
                        <CardGestoras name={gestora.name} phone={gestora.phone} />
                        <aside className="button-join">
                            <button onClick={() => handleJoinGestora(gestora.id)}>Unirse</button>
                        </aside>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gestora;
