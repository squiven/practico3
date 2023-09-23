import React, { Component } from 'react';
import './App.css';
import InterfazJuego from './components/InterfazJuego';
import Marcador from './components/Marcador';
import MostrarResultado from './components/MostrarResultado';
import PartidaFinalizada from './components/PartidaFinalizada';

const OPCIONES = ['piedra', 'papel', 'tijera'];

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
      ganador: null,
      nombreConfirmado: false,
    };
  }

  handleNombreChange = (event) => {
    const jugadorNombre = event.target.value;
    this.setState({ jugadorNombre });
  };

  confirmarNombre = () => {
    const { jugadorNombre } = this.state;

    if (jugadorNombre.trim().length === 0) {
      alert('Por favor, ingresa un nombre válido.');
    } else {
      this.setState({ nombreConfirmado: true, jugadorNombre: jugadorNombre.trim() });
    }
  };

  handleOptionSelect = (opcion) => {
    const { jugadorNombre, ganador: estadoGanador } = this.state;

    if (!jugadorNombre) {
      alert('Por favor, ingresa tu nombre antes de jugar.');
      return;
    }

    if (estadoGanador !== null) {
      return;
    }

    const seleccionPC = OPCIONES[Math.floor(Math.random() * 3)];

    const resultado = this.calcularGanador(opcion, seleccionPC);

    this.setState((prevState) => ({
      seleccionJugador: opcion,
      seleccionPC: seleccionPC,
      resultado: resultado,
      mostrarResultado: true,
      rondasJugadas: prevState.rondasJugadas + 1,
    }), () => {
      if (this.state.rondasJugadas === this.state.rondasMaximas) {
        this.handleFinalizarJuego();
      }
    });
  };

  calcularGanador = (jugador, pc) => {
    if (jugador === pc) {
      return 'Empate';
    } else if (
      (jugador === 'piedra' && pc === 'tijera') ||
      (jugador === 'tijera' && pc === 'papel') ||
      (jugador === 'papel' && pc === 'piedra')
    ) {
      this.setState((prevState) => ({ victoriasJugador: prevState.victoriasJugador + 1 }));
      if (this.state.victoriasJugador >= 2) {
        this.handleFinalizarJuego();
      }
      return '¡Ganaste!';
    } else {
      this.setState((prevState) => ({ victoriasPC: prevState.victoriasPC + 1 }));
      if (this.state.victoriasPC >= 2) {
        this.handleFinalizarJuego();
      }
      return 'La PC ganó';
    }
  };

  handleFinalizarJuego = () => {
    let mensajeFinal = '';
    let ganador = null;

    if (this.state.victoriasJugador >= 2) {
      mensajeFinal = '¡Felicidades, ganaste el juego!';
      ganador = 'jugador';
    } else if (this.state.victoriasPC >= 2) {
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
      ganador: null,
      nombreConfirmado: false,
    });
  };

  render() {
    const {
      jugadorNombre,
      victoriasJugador,
      victoriasPC,
      resultado,
      mostrarResultado,
      ganador,
      nombreConfirmado,
    } = this.state;

    return (
      <div className="App">
        <h1>Piedra Papel Tijera</h1>
        {!nombreConfirmado ? (
          <div>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={jugadorNombre}
              onChange={this.handleNombreChange}
            />
            <button
              onClick={this.confirmarNombre}
              disabled={!jugadorNombre.trim()}
            >
              Confirmar Nombre
            </button>
          </div>
        ) : (
          <p>Bienvenido {jugadorNombre}, vamos a jugar.</p>
        )}

        {ganador !== null && (victoriasJugador === 2 || victoriasPC === 2) && (
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

