import { WINNER_COMBOS } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
  // Revisamos todas las combinaciones ganadoras para saber si hay un ganador
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    // Si la a es igual a la b y la c significa que hay 3 fichas iguales en ralla
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      console.log(boardToCheck[a]);
      return boardToCheck[a];
    }
  }
  // Si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // Si todos los square del tablero son diferentes a null, es decir, que tienen una X o un O
  // Quiere decir que ya se han hecho todos los movimientos posibles y que no hay ganador
  // Esto devuelve un true si ya no hay más movimientos disponibles
  return newBoard.every((Square) => Square !== null);
};
