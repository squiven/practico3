import React from 'react';

const PartidaFinalizada = ({ ganador, handleRestart }) => {
  return (
    <div className="partida-finalizada">
      <h2>Partida Finalizada</h2>
      <p>{ganador === 'jugador' ? '¡Ganaste!' : 'La PC ganó.'}</p>
      <button onClick={handleRestart}>Nueva Partida</button>
    </div>
  );
};

export default PartidaFinalizada;