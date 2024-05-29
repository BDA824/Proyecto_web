import './Card-gestoras.css';

export default function CardGestoras({ name, phone }) {
    return (
        <section className="Card-gestoras-info">
            <div className="label">
                <label htmlFor="name">Nombre: </label>
                <span className='info-gestoras-name'>{name}</span>
            </div>
            <div className='label'>
                <label htmlFor="phone" style={{ color: '#00ffff' }}>Teléfono: </label>
                <span className='info-gestoras-phone'>{phone}</span>
            </div>
        </section>
    );
}
