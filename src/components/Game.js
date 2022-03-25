import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import xbacon from "./images/exbacon.png";
import oegg from "./images/owegg.png";

function refreshPage() {
  window.location.reload(false);
}

const ex = <img className={"img"} src={xbacon}  alt="X"/>
const ow = <img className={"img"} src={oegg}  alt="O"/>


const exes = [
  {
    name: "X",
    image: ex
  }
];

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? ex : ow;
  const ox = xIsNext ? "X" : "O";


  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>React Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner.props.alt : "Next Player: " + ox}</h3>
        <h2><button onClick={refreshPage}>Reset</button></h2>
      </div>
    </>
  );
};

export default Game;
