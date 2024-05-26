import React, { useState, useEffect } from 'react';
import { getGestorasByCountry } from '../../api/broker.api';
import Main from '../Main/Main';
import './Gestoras.css';

const Gestoras = () => {
    const [gestoras, setGestoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const countryId = localStorage.getItem('userCountryId');

    useEffect(() => {
        const fetchGestoras = async () => {
            try {
                const response = await getGestorasByCountry(countryId);
                setGestoras(response.data);
            } catch (error) {
                console.error('Error al cargar las gestoras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGestoras();
    }, [countryId]);

    return (
        <div className="gestoras-container">
            <Main />
            <h1 className="title-gestoras">Gestoras Disponibles</h1>
            <div className="cards-container">
                {loading ? (
                    <p>Cargando gestoras...</p>
                ) : (
                    gestoras.map((gestora) => (
                        <div key={gestora.id} className="card-complete">
                            <div className="gestora-info">
                                <div className="label">
                                    <label>Nombre:</label>
                                    <span className="info-name">{gestora.name}</span>
                                </div>
                                <div className="label">
                                    <label>Valor:</label>
                                    <span className="info-value">{gestora.value}</span>
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

export default Gestoras;
