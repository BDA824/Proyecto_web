import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Brokers.css';
import CardBrokers from '../Tarjet-brokers/Card-brokers'; // Importar el componente
import { getBrokersByCountry } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Broker = () => {
    const [brokers, setBrokers] = useState([]);

    const fetchBrokersByCountry = async (countryId) => {
        try {
            const response = await getBrokersByCountry(countryId);
            setBrokers(response.data);
        } catch (error) {
            console.error('Error fetching brokers:', error);
            toast.error('Error al obtener brokers disponibles');
        }
    };

    useEffect(() => {
        const userCountryId = localStorage.getItem('userCountryId');
        if (userCountryId) {
            fetchBrokersByCountry(userCountryId);
        }

        const handleStorageChange = () => {
            const updatedCountryId = localStorage.getItem('userCountryId');
            if (updatedCountryId) {
                fetchBrokersByCountry(updatedCountryId);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className="brokers-container">
            <Main />
            <h1 className="title-brokers">Brokers disponibles</h1>
            <div className="cards-container">
                {brokers.map(broker => (
                    <div className="card-complete" key={broker.id}>
                        <CardBrokers name={broker.name} phone={broker.phone} /> {/* Usar el componente */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Broker;
