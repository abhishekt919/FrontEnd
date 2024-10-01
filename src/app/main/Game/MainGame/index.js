import { useState } from "react";
import { Button } from "@mui/material";
import "./style.css";
//import Board from './Board'; // Assuming you have a Board component

function Square({ value, onSquareClick, highlight }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{
        color: value === "X" ? "blue" : "red",
        backgroundColor: highlight ? "yellow" : "white",
      }}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.line || [];

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Match is a tie";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          highlight={winningSquares.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          highlight={winningSquares.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          highlight={winningSquares.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          highlight={winningSquares.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          highlight={winningSquares.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          highlight={winningSquares.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          highlight={winningSquares.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          highlight={winningSquares.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          highlight={winningSquares.includes(8)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo.winner;
  const winningSquares = winnerInfo.line;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    const { winner } = calculateWinner(squares);
    let description = "Go to game start";
    if (winner) {
      description = "Game is over! Here is your winner: " + winner;
    } else if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningSquares={winningSquares}
        />
        <Button
          onClick={restartGame}
          className="restart-button"
          variant="contained"
          color="secondary"
        >
          Restart
        </Button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}
