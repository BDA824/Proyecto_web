import './Card-action.css';

export default function CardAction({ name, value }) {
    return (
        <section className="Card-action-info">
            <div className="label">
                <label htmlFor="name">Nombre: </label>
                <span className='info-buy-name'>{name}</span>
            </div>
            <div className='label'>
                <label htmlFor="value">Valor: </label>
                <span className='info-buy-value'>{value} USD</span>
            </div>
            
        </section>
    );
}
