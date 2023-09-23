import React, { Component } from 'react';
import './App.css';
import InterfazJuego from './components/InterfazJuego';
import Marcador from './components/Marcador';
import MostrarResultado from './components/MostrarResultado';
import PartidaFinalizada from './components/PartidaFinalizada';

class App extends Component {
  constructor() {
    super();
    this.state = {
      jugadorNombre: '',
      victoriasJugador: 0,
      victoriasPC: 0,
      seleccionJugador: null,
      seleccionPC: null,
      resultado: '',
      mostrarResultado: false,
      rondasJugadas: 0,
      rondasMaximas: 5,
      nombreConfirmado: false,
      ganador: null
    };
  }

  handleNombreChange = (event) => {
    const jugadorNombre = event.target.value;
    this.setState({ jugadorNombre });
  };

handleOptionSelect = (opcion) => {
  // Verificar si la partida ya ha finalizado
  if (this.state.ganador) {
    return; // Salir temprano si la partida ha finalizado
  }

  const opciones = ['piedra', 'papel', 'tijera'];
  const seleccionPC = opciones[Math.floor(Math.random() * 3)];
  const seleccionJugador = opcion;

  let resultado = '';
  if (seleccionJugador === seleccionPC) {
    resultado = 'Empate';
  } else if (
    (seleccionJugador === 'piedra' && seleccionPC === 'tijera') ||
    (seleccionJugador === 'tijera' && seleccionPC === 'papel') ||
    (seleccionJugador === 'papel' && seleccionPC === 'piedra')
  ) {
    resultado = '¡Ganaste!';
    this.setState((prevState) => ({ victoriasJugador: prevState.victoriasJugador + 1 }));
  } else {
    resultado = 'La PC ganó';
    this.setState((prevState) => ({ victoriasPC: prevState.victoriasPC + 1 }));
  }

  this.setState({
    seleccionJugador,
    seleccionPC,
    resultado,
    mostrarResultado: true,
    rondasJugadas: this.state.rondasJugadas + 1,
  });

  if (this.state.rondasJugadas === this.state.rondasMaximas) {
    this.handleFinalizarJuego();
  }
};

  handleFinalizarJuego = () => {
    let mensajeFinal = '';
    let ganador = null; // Nuevo estado para rastrear al ganador
  
    if (this.state.victoriasJugador >= 3) {
      mensajeFinal = '¡Felicidades, ganaste el juego!';
      ganador = 'jugador';
    } else if (this.state.victoriasPC >= 3) {
      mensajeFinal = 'La PC ganó el juego. ¡Mejor suerte la próxima vez!';
      ganador = 'pc';
    }
  
    this.setState({ resultado: mensajeFinal, ganador });
  };

  handleRestart = () => {
    this.setState({
      jugadorNombre: '',
      victoriasJugador: 0,
      victoriasPC: 0,
      seleccionJugador: null,
      seleccionPC: null,
      resultado: '',
      mostrarResultado: false,
      rondasJugadas: 0,
      nombreConfirmado: false,
      ganador: null,
    });
  };
  
  handleConfirmarNombre = () => {
    this.setState({ nombreConfirmado: true });
  };
  
  render() {
    const {
      jugadorNombre,
      victoriasJugador,
      victoriasPC,
      resultado,
      mostrarResultado,
      nombreConfirmado,
      ganador,
    } = this.state;

    return (
      <div className="App">
        <h1>Piedra Papel Tijera</h1>
        {!nombreConfirmado && (
          <div>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={jugadorNombre}
              onChange={this.handleNombreChange}
              disabled={nombreConfirmado}
            />
            <button
              onClick={this.handleConfirmarNombre}
              disabled={nombreConfirmado || jugadorNombre.trim() === ''}
            >
              Confirmar Nombre
            </button>
          </div>
        )}
        {nombreConfirmado && (
          <p>Bienvenido {jugadorNombre}, vamos a jugar.</p>
        )}

        {/* Muestra la alerta de partida finalizada si alguien llega a 3 victorias */}
        {ganador && (victoriasJugador === 3 || victoriasPC === 3) && (
          <PartidaFinalizada ganador={ganador} handleRestart={this.handleRestart} />
        )}

        <Marcador
          victoriasJugador={victoriasJugador}
          victoriasPC={victoriasPC}
        />
        <InterfazJuego handleOptionSelect={this.handleOptionSelect} />
        <MostrarResultado
          resultado={resultado}
          mostrar={mostrarResultado}
          handleRestart={this.handleRestart}
        />
      </div>
    );
  }
}

export default App;
