import React from 'react';
import Main from "../Main/Main";
import './AboutUs.css';

const AboutUsPage = () => {
    return (
        <div className="aboutus-container">
            <Main />
            <h2 className="aboutus-title">Quienes Somos</h2>
            <p className="aboutus-content">Somos tres estudiantes apasionados por la ingeniería informática en la Universidad de Envigado,
            dedicados a la innovación y la excelencia académica. Nuestro camino está marcado por el constante
            aprendizaje y la aplicación práctica de nuestros conocimientos. Actualmente, nos encontramos en la
            etapa final de nuestra formación académica, donde estamos canalizando nuestras habilidades y experiencia
            en el desarrollo de un proyecto ambicioso: un broker de tecnología avanzada. Este proyecto no solo representa
            nuestro compromiso con la educación y el desarrollo profesional, sino que también refleja nuestro deseo de contribuir
            significativamente al campo de la informática con soluciones creativas y eficientes. Con una base sólida en teoría y práctica,
            estamos listos para enfrentar los desafíos del futuro y dejar nuestra huella en la industria tecnológica.</p>
        </div>
    );
};

export default AboutUsPage;
