import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Gestoras.css';
import CardGestoras from '../Tarjet-gestoras/Card-gestoras'; // Importar el componente
import { getGestorasByCountry } from '../../api/broker.api';
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
                        <CardGestoras name={gestora.name} phone={gestora.phone} /> {/* Usar el componente */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gestora;
