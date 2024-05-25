import React from 'react';
import Main from '../Main/Main';
import './Traders.css';
import CardAction from '../Target-action/Card-action';


const Traders = () => {
  return (
    <div className="traders-container">
        <Main />
        <h1 className='title-actions'>Acciones disponibles para comprar</h1>
        <div className='card-complete'>
          <CardAction />
          <aside className='button-buy'>
            <button>Comprar</button>
          </aside>
        </div>
        <div className='card-complete'>
          <CardAction />
          <aside className='button-buy'>
            <button>Comprar</button>
          </aside>
        </div>
        <div className='card-complete'>
          <CardAction />
          <aside className='button-buy'>
            <button>Comprar</button>
          </aside>
        </div>
        <div className='card-complete'>
          <CardAction />
          <aside className='button-buy'>
            <button>Comprar</button>
          </aside>
        </div>
        <div className='card-complete'>
          <CardAction />
          <aside className='button-buy'>
            <button>Comprar</button>
          </aside>
        </div>
    </div>
  );
};

export default Traders;
