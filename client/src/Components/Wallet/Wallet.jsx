// Wallet.jsx

import React, { useState, useEffect } from 'react';
import './Wallet.css';
import Main from '../Main/Main';
import { getUserProfile, getUserWallet } from '../../api/broker.api';

const Wallet = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userWallet, setUserWallet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Obtener el ID del usuario autenticado
                const response = await getUserProfile(userId); // Obtener el perfil del usuario autenticado
                setUserProfile(response.data); // Establecer el perfil del usuario en el estado
                setUserWallet(getUserWallet()); // Obtener la billetera del usuario autenticado
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserWallet = async () => {
            try {
                const wallet = getUserWallet();
                setUserWallet(wallet);
            } catch (error) {
                console.error('Error fetching user wallet:', error);
            }
        };

        fetchUserWallet();
    }, []);

    return (
        <div className="wallet-container">
            <Main />
            <h2 className="wallet-title">Wallet</h2>
            <div className="wallet-content">
                <h3>Gestora o Broker: </h3>
                <p>{userWallet ? (userWallet.gestora ? userWallet.gestora.name : 'Ninguna') : 'Cargando...'}</p>
            </div>
            <div className="wallet-content">
                <h3>Saldo: </h3>
                <p>{userProfile ? (userProfile.saldo !== null ? userProfile.saldo : 'Sin saldo disponible') : 'Cargando...'}</p>
            </div>
            <div className="wallet-content">
                <h3>Acciones: </h3>
                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    <ul>
                        {userWallet && userWallet.actions && userWallet.actions.length > 0 ? (
                            userWallet.actions.map(action => (
                                <li key={action.id}>{action.name} - Valor: {action.value}</li>
                            ))
                        ) : (
                            <li>No tienes acciones.</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Wallet;
