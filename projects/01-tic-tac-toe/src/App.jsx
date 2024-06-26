import {
  resetGameFromStorage,
  saveGameToStorage,
} from "./logic/storage/index.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Square } from "./components/Square.jsx";
import confetti from "canvas-confetti";
import { TURNS } from "./constants.js";
import { useState, useEffect } from "react";

function App() {
  // LOS HOOKS (useState) NUNCA DEBEN ESTAR DENTRO DE IFs
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    // ?? Se mira si es null o undefined
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null no hay ganador y false hay empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameFromStorage();
  };

  const updateBoard = (index) => {
    // No actualizamos la posición si ya tiene algo
    if (board[index] || winner) return;

    // Actualizar el tablero
    // Minuto 26 del tutorial explicación del porque se hace un newBoard
    const newBoard = [...board];
    newBoard[index] = turn; // X u O
    setBoard(newBoard);

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar aquí la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // Revisamos si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      // LA ACTUALIZACION DEL ESTADO ES ASINCRONO MINUTO 33 VIDEO REVISAR
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // Si ya no hay más movimientos disponibles se devuelve un true y quiere decir que hay empate
      setWinner(false); // Empate
    }
  };

  useEffect(() => {
    console.log("UseEffect");
  }, [turn]);

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Resetear juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
