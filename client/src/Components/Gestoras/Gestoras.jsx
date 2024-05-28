import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Gestoras.css';
import { getGestorasByCountry } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Gestora = () => {
    const [gestoras, setGestoras] = useState([]);

    const fetchGestorasByCountry = async (countryId) => {
        try {
            const response = await getGestorasByCountry(countryId);
            const gestorasData = Array.isArray(response.data) ? response.data : [];
            setGestoras(gestorasData);
        } catch (error) {
            console.error('Error fetching gestoras:', error);
            toast.error('Error al obtener gestoras disponibles');
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const userCountryId = localStorage.getItem('userCountryId');
            if (userCountryId) {
                fetchGestorasByCountry(userCountryId);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        const initialCountryId = localStorage.getItem('userCountryId');
        if (initialCountryId) {
            fetchGestorasByCountry(initialCountryId);
        }

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
                        <h2>{gestora.name}</h2>
                        <p>Telefono: {gestora.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gestora;
