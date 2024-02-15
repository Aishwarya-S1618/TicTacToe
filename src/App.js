// Import necessary hooks from React
import { useEffect, useState } from "react"
// Import the logo image
import logo from './logo192.png';
// Import the Help component
import Help from "./Help";

function Square({ id, value, onSquareClick,ifWinning}) {
  // Set the color of the text based on the value of the square
  // const[isWinning, setIsWinning]=useState(false);
  // if(ifWinning){
  //   setIsWinning(true);
  // }
  console.log("Winning =",ifWinning);
  return (    
    <button className={"square " + (ifWinning? "winning--square":"")} onClick={onSquareClick} style={{ color: value === "X" ? 'red' : 'green' }}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningSquares, cMove }) {
  // Add event listener for keydown event
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    };
  });


  // Handle keydown event and call handleClick with the mapped key
  function handleKeyPress(e) {
    const keyPressed = e.key;
    if (1 <= keyPressed && keyPressed <= 9) {
      const mappedKey = keyPressed - 1;
      handleClick(mappedKey);
    }
  }

  // Render a square for each index in the squares array
  const renderSquare = (idx) => {
    return (
      <Square
        key={idx}
        value={squares[idx]}
        onSquareClick={() => handleClick(idx)}
        ifWinning= {winningSquares.includes(idx)}
      />
    );
  }; 
      // Calculate the winner of the game
      const winners=calculateWinner(squares);
      let status;
    
      // Set the status of the game based on the winner or the number of moves
      if (winners) {    
        status = ("Winner: " + winners.player);
        console.log(winners.line);
      } else if (cMove === 9) {
        status = ("Game Over- TIE");
      } else {
        status = ("Next player: " + (xIsNext ? "X" : "O"));
      }

  // Handle click event for a square
  function handleClick(i) {
    // If the square has already been clicked or there is a winner, return
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // Create a new array with the updated squares
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }
  
  // Render the board rows
  const renderBoardRow = (start) => (
    <div className="board-row">
      {[0, 1, 2].map((offset) => renderSquare(start + offset))}
    </div>
  );

  // Return the board component with the necessary props
  return (
    <>
      <div>
        {Array.from({ length: 3 }, (_, row) => renderBoardRow(row * 3))}
        <div className="status">{status}</div>
      </div>
    </>
  );
}

// Export the Game component
export default function Game() {
  // Set the state for inHelp, history, winners and current move

  const [inHelp, setInHelp] = useState(false);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Calculate the value of xIsNext and the current squares
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  // Handle play event and update the history and current move
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jump to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Undo the last move
  function undo() {
    if (currentMove !== 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  // Render the moves list
  const moves = history.map((squares, move) => {
    let description;

    // Set the description based on the move
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    // Render the undo button
    let advUndo = <button className="AdvUndo" onClick={() => jumpTo(move)}>{description}</button>;

    // Return the move component
    return (
      <ol key={move}>
        {advUndo}
      </ol>
    );
  });

  // If inHelp is true, render the Help component
  if (inHelp === true) {
    return <Help setHelpToFalse={setInHelp}></Help>
  }

  // Return the Game component with the necessary props
  return (
    <div className="App">
      {/* <Logo /> */}
      
      <div className="App-header">
      <img className="App-logo" src={logo} alt="logo" />
        <h1>TIC TAC TOE</h1>
        <button className="helpBtn" onClick={() => { setInHelp(true) }}>How to play</button>
      </div>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winner ? winner.line : []} cMove={currentMove} />
        </div>
        <div className="game-info">
          <div className="option">
            <button className="options" onClick={() => undo()}>Undo</button>
            <button className="options" onClick={() => jumpTo(0)}>Reset</button>
          </div>
          <ol className="advoption">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

// Calculate the winner of the game
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

  // Check each line for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {player: squares[a], line:[a, b, c]};
    }
  }
  // Return null if there is no winner
  return null;
}