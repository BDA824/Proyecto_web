import './Card-brokers.css';

export default function CardBrokers({ name, phone }) {
    return (
        <section className="Card-brokers-info">
            <div className="label">
                <label htmlFor="name">Nombre: </label>
                <span className='info-brokers-name'>{name}</span>
            </div>
            <div className='label'>
                <label htmlFor="phone" style={{ color: '#00ffff' }}>Teléfono: </label>
                <span className='info-brokers-phone'>{phone}</span>
            </div>
        </section>
    );
}
