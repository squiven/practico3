import React from 'react';

function MostrarResultado(props) {
  return (
    <div className="resultado" style={{ display: props.mostrar ? 'block' : 'none' }}>
      <p id="resultadoTexto">{props.resultado}</p>
      <button onClick={props.handleRestart}>Reiniciar</button>
    </div>
  );
}

export default MostrarResultado;