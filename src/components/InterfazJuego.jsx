import React from 'react';
import piedraImagen from '../assets/piedra.png';
import papelImagen from '../assets/papel.png';
import tijeraImagen from '../assets/tijeras.png';


function InterfazJuego({ handleOptionSelect }) {
  return (
    <div className="botones">
      <button className="opcion" id="piedra" onClick={() => handleOptionSelect('piedra')}>
        <img src={piedraImagen} alt="Piedra" />
      </button>
      <button className="opcion" id="papel" onClick={() => handleOptionSelect('papel')}>
        <img src={papelImagen} alt="Papel" />
      </button>
      <button className="opcion" id="tijera" onClick={() => handleOptionSelect('tijera')}>
        <img src={tijeraImagen} alt="Tijera" />
      </button>
    </div>
  );
}

export default InterfazJuego;