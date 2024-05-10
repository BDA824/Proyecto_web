import React from 'react';
import './App.css'; // Asegúrate de tener este archivo CSS en tu proyecto

function Productos() {
    const comprar = () => {
        alert('Estás comprando un producto');
    };

    const vender = () => {
        alert('Estás vendiendo un producto');
    };

    const resumenCompras = () => {
        alert('Estás viendo el resumen de tus compras');
    };

    return (
        <div>
            <div className="desplegable">
                <select>
                    <option value="accion1">ACCIONES</option>
                </select>
                <select>
                    <option value="PARA TRADERS">PARA TRADERS</option>
                    <option value="PARA TRADERS">COMPRA SEGURA</option>
                </select>
                <select>
                    <option value="QUIENES SOMOS">NOSOTROS</option>
                    <option value="IUE">IUE</option>
                </select>
                <button onClick={() => alert('Perfiles')}>Perfil</button>
            </div>
            <div>
                <h2 id="nombreUsuario">Welcome <span>Usuario</span></h2>
            </div>
            <div className="div2">
                <h1>Acciones</h1>
                <table>
                    <thead>
                        <tr>
                            <td><button onClick={comprar}>Comprar</button></td>
                            <td><button onClick={vender}>Vender</button></td>
                            <td><button onClick={resumenCompras}>Resumen</button></td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default Productos;
