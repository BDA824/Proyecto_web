import React from 'react';
import Main from "../Main/Main";
import './Wallet.css';

const WalletPage = () => {
    return (
        <div className="wallet-container">
            <Main />
            <h2 className="wallet-title">Mi Billetera</h2>
            <p className="wallet-content">Información y funcionalidades relacionadas con la billetera del usuario.</p>
        </div>
    );
};

export default WalletPage;
