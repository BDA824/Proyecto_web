import React, { useState, useEffect } from 'react';
import './Wallet.css';
import Main from '../Main/Main';
import { getUserGestora, getUserBalance, getUserActions } from '../../api/broker.api';

export default function Wallet() {
    const [userGestora, setUserGestora] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [userActions, setUserActions] = useState([]);
    const userCountry = localStorage.getItem('userCountryId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gestoraResponse = await getUserGestora(userCountry);
                setUserGestora(gestoraResponse.name);
            } catch (error) {
                console.error('Error fetching user gestora:', error);
            }

            try {
                const balanceResponse = await getUserBalance(userCountry);
                setUserBalance(balanceResponse.balance);
            } catch (error) {
                console.error('Error fetching user balance:', error);
            }

            try {
                const actionsResponse = await getUserActions(userCountry);
                setUserActions(actionsResponse);
            } catch (error) {
                console.error('Error fetching user actions:', error);
            }
        };

        fetchData();
    }, [userCountry]);

    return (
        <div className="wallet-container">
            <Main />
            <h2 className="wallet-title">Wallet</h2>
            <div className="wallet-content">
                <h3>Gestora o Broker: </h3>
                <p>{userGestora}</p>
            </div>
            <div className="wallet-content">
                <h3>Saldo: </h3>
                <p>{userBalance}</p>
            </div>
            <div className="wallet-content">
                <h3>Acciones: </h3>
                <ul>
                    {userActions.length > 0 ? (
                        userActions.map(action => (
                            <li key={action.id}>{action.name} - Valor: {action.value}</li>
                        ))
                    ) : (
                        <li>No tienes acciones.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
