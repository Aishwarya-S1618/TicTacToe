import { useState } from "react";
// import { ReactComponent as Logo } from './logo.svg'
import logo from './logo192.png'

function Square({id, value, onSquareClick }) {
  console.log("val =",value)
  // if (squares && calculateWinner(squares)){
  //   var a=0
  //   var b =9
  //   var c =5
  // }
  return (
    <button className="square" onClick={onSquareClick} style={{color: value==="X"? 'red':'green'}}>
      {value}
    </button>
  );
}
function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {
    if (squares[i]|| calculateWinner(squares)) {
      return;
    }
    
    const nextSquares = squares.slice();
    
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
    
  }
  const winners = calculateWinner(squares);
  
  let status;
  if (winners) {
    status = "Winner: " + winners[0];
   
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      
      <div className="board-row">
        <Square id={1} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square id={2} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square id={3} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square id={4} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square id={5} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square id={6} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square id={7} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square id={8} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square id={9} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
    </>
  );
}

export default function Game() {
  
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  console.log("history--->",history)
  const [currentMove, setCurrentMove] = useState(0);
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log("next history--->",history)

  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  const moves = history.map((squares, move) => {
    let description;
    
    // const [atMoveState,setAtMoveState] = useState(atMove)
    if (move > 0) {
      description ='Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    let undo
    undo=<button className="Undo" onClick={() => jumpTo(move)}>{description}</button>
    // function AtMove(n){
    //    return( <h3>You are at # {n}</h3>)
    //   }()
    return (
     
      <ol key ={move}>
      {undo}
      </ol>

    
    );
  });
  console.log("history--->",history)

  return (
    <div className="App">
      {/* <Logo /> */}
      <img className="App-logo" src = {logo} alt ="logo"/>
      <div className="App-header">
        <h1>TIC TAC TOE</h1>
      </div>
      <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
        <ol>{moves}</ol>
      </div>
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a],a,b,c];
    }
  }
  return null;
}

