import { useState, useEffect } from "react"
import React from "react"
import "./style.css"


function Help({ setHelpToFalse }){
    const [isOpen, setIsOpen] = useState(true)
    const containerRef = React.useRef()
    
    useEffect(() => {
      const handleClickOutside = (event) =>{
        if (containerRef.current && !containerRef.current.contains(event.target))
       {
          setIsOpen(false)
          setHelpToFalse(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () =>{
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [setHelpToFalse])
    console.log(isOpen)

    return (
        <div className="container" ref={containerRef}>
          <div className ="formbox">
            <button className="close-btn" onClick={()=>setHelpToFalse(false)}> Close </button>
          <div className="help">
            <h2>How to Play</h2>
            <p>Tic-Tac-Toe is a 2 player game is played on a grid that's 3 squares by 3 squares.If you are '<span style ={{color:"red",fontWeight:"bolder"}}> X </span>' your friend is an '<span style ={{color:"green",fontWeight:"bolder"}}> O </span>'.</p>
            <p>Players take turns putting their marks in empty squares in two ways. 
              <li>Clicking on the empty square</li>
              <li>Typing the number keys (1 to 9) that match the number of the empty square</li>
            <pre>                1  2  3</pre>
            <pre>                4  5  6</pre>
            <pre>                7  8  9</pre></p>
            <p>The first player to get 3 of their marks in a row (up, down, across, or diagonally) is the <strong>WINNER</strong>.</p>
            <p>When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.</p>
            
            <h2>Options</h2>
            <ul>
              <li><button className="options" > Undo </button> : Undo the last move made in the game.</li>
              <li><button className="options" > Reset </button> : Start the game over from the beginning.</li>
              <li><button className="AdvUndo" > Go to move #n</button> : Resume the game from the nth move</li>
            </ul>
          </div>
      </div>
    </div>
    );
  }

export default Help;