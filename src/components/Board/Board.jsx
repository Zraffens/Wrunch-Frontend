import React, { useState, useEffect } from "react";
import "./Board.css";
import { render } from "@testing-library/react";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [renderBoard, setRenderBoard] = useState([]);
  const [occupiedPositions, setOccupiedPositions] = useState([]);

  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = () => {
    fetch("http://localhost:8000/board")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBoard(data.grid);
        setRenderBoard([...data.grid, [...Array(data.grid.length).keys()]]);
        const wordsAndPositions = data.words;
        const occupiedPositionstemp = [];
        console.log(data.words)

        for (const [word, { position, horizontal }] of Object.entries(
          wordsAndPositions
        )) {
          const [row, col] = position;
          const wordLength = word.length;

          if (horizontal) {
            for (let i = 0; i < wordLength; i++) {
              occupiedPositionstemp.push([row, col + i]);
            }
          } else {
            for (let i = 0; i < wordLength; i++) {
              occupiedPositionstemp.push([row + i, col]);
            }
          }
        }
        setOccupiedPositions(occupiedPositionstemp)
      });
  };

  return (
    <div className="board-container">
      {console.log(renderBoard)}
      {/* {renderBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {<div className={`${rowIndex == board.length ? 'text-white': null} rowIndex`}>{rowIndex}</div>}
          {row.map((cell, colIndex) => (
            <>
            {board.length == rowIndex ? (
              <span className="index" key={`a${cell}`}>{cell}</span>
            ) : (
              <span
              key={`${rowIndex}-${colIndex}`}
              className={`${rowIndex % 2 === 0 ? "even" : "odd"} letter`}
            >
              {cell}
            </span>
            )}
            </>
          ))}
          
        </div>
      ))} */}
      {renderBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {
            <div
              className={`${
                rowIndex == board.length ? "text-white" : null
              } rowIndex`}
            >
              {rowIndex}
            </div>
          }
          {row.map((cell, colIndex) => (
            <>
              {board.length == rowIndex ? (
                <span className="index" key={`a${cell}`}>
                  {cell}
                </span>
              ) : (
                <span
                  key={`${rowIndex}-${colIndex}`}
                  className={`${rowIndex % 2 === 0 ? "even" : "odd"} letter`}
                  style={{
                    backgroundColor: occupiedPositions.some(pos => pos[0] === rowIndex && pos[1] === colIndex) ? 'yellow' : 'transparent'
                  }}
                >
                  {cell}
                </span>
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

// Example usage
const wordList = ["apple", "grape", "kiwi", "melon", "peach", "pear", "plum"];

export default Board;
