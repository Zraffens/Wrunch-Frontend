import React, { useState, useEffect } from "react";
import "./Board.css";
import { render } from "@testing-library/react";

const Board = ({ rows, cols, wordList }) => {
  const [board, setBoard] = useState([]);
  const [renderBoard, setRenderBoard] = useState([])


  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = () => {
    fetch('http://localhost:8000/board')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setBoard(data.grid);
      setRenderBoard([...data.grid, [...Array(data.grid.length).keys()]])
    });
  };

  // const generateRandomLetter = () => {
  //   const letters = ["E", "A", "R", "I", "O", "T", "N", "S", "L", "C"];
  //   const biases = [
  //     11.1607, 8.4966, 7.5809, 7.5448, 7.1635, 6.9509, 6.6544, 5.7351, 5.4893,
  //     4.5388,
  //   ];

  //   // Calculate the total bias of the provided letters
  //   const totalBias = biases.reduce((sum, bias) => sum + bias, 0);

  //   // Calculate the common bias for the remaining letters
  //   const remainingLetters = 26 - letters.length;

  //   const commonBias = (100 - totalBias) / remainingLetters;

  //   // Generate the weighted list of letters
  //   const weightedLetters = [];
  //   for (let i = 0; i < letters.length; i++) {
  //     weightedLetters.push({ letter: letters[i], bias: biases[i] });
  //   }
  //   for (let i = 0; i < remainingLetters; i++) {
  //     weightedLetters.push({ letter: "", bias: commonBias }); // Placeholder for remaining letters
  //   }

  //   // Generate a random number between 0 and total bias
  //   const randomBias = Math.random() * totalBias;

  //   // Find the letter corresponding to the random bias
  //   let cumulativeBias = 0;
  //   for (let i = 0; i < weightedLetters.length; i++) {
  //     cumulativeBias += weightedLetters[i].bias;
  //     if (randomBias <= cumulativeBias) {
  //       return weightedLetters[i].letter.toUpperCase();
  //     }
  //   }

  //   // This should never be reached, but just in case
  //   return "";
  // };

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  // const canPlaceWord = (word, row, col, dRow, dCol) => {
  //   if (col + word.length * dCol > cols || row + word.length * dRow > rows) {
  //     return false;
  //   }
  //   return true;
  // };

  // const swapAdjacentCells = (row, col, newBoard) => {
  //   const adjacentCells = [];
  //   if (row > 0) adjacentCells.push([row - 1, col]);
  //   if (row < rows - 1) adjacentCells.push([row + 1, col]);
  //   if (col > 0) adjacentCells.push([row, col - 1]);
  //   if (col < cols - 1) adjacentCells.push([row, col + 1]);

  //   const randomIndex = Math.floor(Math.random() * adjacentCells.length);
  //   const [adjRow, adjCol] = adjacentCells[randomIndex];
  //   const temp = newBoard[row][col];
  //   newBoard[row][col] = newBoard[adjRow][adjCol];
  //   newBoard[adjRow][adjCol] = temp;
  //   occupiedPositions.add(`${adjRow}-${adjCol}`);

  //   return newBoard;
  // };

  // const createRandomBoard = () => {
  //   let newBoard = [];
  //   for (let i = 0; i < rows; i++) {
  //     newBoard.push([]);
  //     for (let j = 0; j < cols; j++) {
  //       newBoard[i][j] = generateRandomLetter();
  //     }
  //   }
  //   return newBoard;
  // };

  // const generateBoard = () => {
  //   let newBoard = createRandomBoard();

  //   const horizontalWordsCount = Math.floor(Math.random() * 6);
  //   console.log(horizontalWordsCount);
  //   const verticalWordsCount = wordList.length - horizontalWordsCount;
  //   const shuffledWords = shuffleArray(wordList.slice());

  //   for (let i = 0; i < horizontalWordsCount; i++) {
  //     newBoard = placeRandomWord(shuffledWords[i], newBoard, true);
  //   }

  //   for (let i = horizontalWordsCount; i < wordList.length; i++) {
  //     newBoard = placeRandomWord(shuffledWords[i], newBoard, false);
  //   }
  //   setBoard(newBoard);
  // };

  // const occupiedPositions = new Set();
  // let wordsAndPositions = new Object();
  // const placeRandomWord = (word, newBoard, horizontal) => {
  //   let attempts = 0;
  //   let horBoard = newBoard.slice();
  //   console.log(wordsAndPositions);
  //   while (attempts < 10000) {
  //     const startRow = Math.floor(Math.random() * rows);
  //     const startCol = Math.floor(Math.random() * cols);
  //     let isOccupied = false;
  //     for (let i = 0; i < word.length; i++) {
  //       if (
  //         (occupiedPositions.has(`${startRow}-${startCol + i}`) &&
  //           horizontal) ||
  //         (occupiedPositions.has(`${startRow + i}-${startCol}`) && !horizontal)
  //       ) {
  //         isOccupied = true;
  //         break;
  //       }
  //     }
  //     if (
  //       !isOccupied &&
  //       horizontal &&
  //       canPlaceWord(word, startRow, startCol, 0, 1)
  //     ) {
  //       for (let i = 0; i < word.length; i++) {
  //         horBoard[startRow][startCol + i] = word[i].toUpperCase();
  //         occupiedPositions.add(`${startRow}-${startCol + i}`);
  //         wordsAndPositions[word] = `${startRow}-${startCol + i}`;
  //       }

  //       const randomIndex = Math.floor(Math.random() * word.length);
  //       horBoard = swapAdjacentCells(
  //         startRow,
  //         startCol + randomIndex,
  //         horBoard
  //       );

  //       return horBoard;
  //     } else if (
  //       !isOccupied &&
  //       !horizontal &&
  //       canPlaceWord(word, startRow, startCol, 1, 0)
  //     ) {
  //       for (let i = 0; i < word.length; i++) {
  //         newBoard[startRow + i][startCol] = word[i].toUpperCase();
  //         occupiedPositions.add(`${startRow + i}-${startCol}`); // Add occupied positions
  //         wordsAndPositions[word] = `${startRow + i}-${startCol}`;
  //       }
  //       const randomIndex = Math.floor(Math.random() * word.length);
  //       newBoard = swapAdjacentCells(
  //         startRow + randomIndex,
  //         startCol,
  //         newBoard
  //       );
  //       return newBoard;
  //     }
  //     attempts++;
  //   }
  //   console.error("Failed to place word:", word);
  //   return newBoard;
  // };

  // const printBoard = () => {
  //   for (let i = 0; i < rows; i++) {
  //     console.log(board[i].join(" "));
  //   }
  // };

  return (
    <div className="board-container">
      {console.log(renderBoard)}
      {renderBoard.map((row, rowIndex) => (
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
          
          {/* {row.map((cell, colIndex) => (
            // {unreadMessages.length > 0 &&
            //   <h2>
            //     You have {unreadMessages.length} unread messages.
            //   </h2>
            // }
            <div className="rowIndex">
              
            {board.length - 1 == rowIndex ? <span className="index" key={`a${colIndex}`}>{colIndex}</span> : null}</div>
          ))} */}
        </div>
      ))}
    </div>
  );
};

// Example usage
const wordList = ["apple", "grape", "kiwi", "melon", "peach", "pear", "plum"];

export default Board;
