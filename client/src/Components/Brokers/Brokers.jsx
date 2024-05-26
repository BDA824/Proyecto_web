import React, { useState, useEffect } from 'react';
import { getBrokersByCountry } from '../../api/broker.api';
import Main from '../Main/Main';
import './Brokers.css';

const Brokers = () => {
    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState(true);
    const countryId = localStorage.getItem('userCountryId');

    useEffect(() => {
        const fetchBrokers = async () => {
            try {
                const response = await getBrokersByCountry(countryId);
                setBrokers(response.data);
            } catch (error) {
                console.error('Error al cargar los brokers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrokers();
    }, [countryId]);

    return (
        <div className="brokers-container">
            <Main />
            <h1 className="title-brokers">Brokers Disponibles</h1>
            <div className="cards-container">
                {loading ? (
                    <p>Cargando brokers...</p>
                ) : (
                    brokers.map((broker) => (
                        <div key={broker.id} className="card-complete">
                            <div className="broker-info">
                                <div className="label">
                                    <label>Nombre:</label>
                                    <span className="info-name">{broker.name}</span>
                                </div>
                                <div className="label">
                                    <label>Valor:</label>
                                    <span className="info-value">{broker.value}</span>
                                </div>
                            </div>
                            <div className="button-buy">
                                <button>Comprar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Brokers;
