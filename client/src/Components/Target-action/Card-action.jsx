import './Card-action.css'
import img from '../images/icon-id.png';

export default function CardAction({name, value}) {

    return (
        <section className="Card-action-info"> 
            <div className="label">
                <label htmlFor="">Nombre: </label>    
            </div>
            <span className='info-buy-name'>PFVAL</span>
            <div className="label">
                <label htmlFor="">Valor: </label>
            </div>
            <span className='info-buy-value'>126,30 USD</span>
        </section>
    );
}