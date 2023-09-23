import React from 'react';

function Marcador(props) {
  return (
    <div className="marcador">
      <h2>Marcador</h2>
      <p className="marcador_jug">Jugador: <span>{props.victoriasJugador}</span></p>
      <p className="marcador_pc">PC: <span>{props.victoriasPC}</span></p>
    </div>
  );
}

export default Marcador;