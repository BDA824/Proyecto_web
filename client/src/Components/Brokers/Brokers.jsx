import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import './Brokers.css';
import { getBrokersByCountry } from '../../api/broker.api';
import { toast } from 'react-hot-toast';

const Broker = () => {
    const [brokers, setBrokers] = useState([]);

    const fetchBrokersByCountry = async (countryId) => {
        try {
            const response = await getBrokersByCountry(countryId);
            const brokersData = Array.isArray(response.data) ? response.data : [];
            setBrokers(brokersData);
        } catch (error) {
            console.error('Error fetching brokers:', error);
            toast.error('Error al obtener brokers disponibles');
        }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const userCountryId = localStorage.getItem('userCountryId');
            if (userCountryId) {
                fetchBrokersByCountry(userCountryId);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        const initialCountryId = localStorage.getItem('userCountryId');
        if (initialCountryId) {
            fetchBrokersByCountry(initialCountryId);
        }

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
                        <h2>{broker.name}</h2>
                        <p>Valor: {broker.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Broker;
