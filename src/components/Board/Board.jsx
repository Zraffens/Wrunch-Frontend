import React, { useState, useEffect } from "react";
import "./Board.css";

const Board = ({ rows, cols, wordList }) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    console.log("use effect ran");
    generateBoard();
  }, []);

  const generateRandomLetter = () => {
    const letters = ["E", "A", "R", "I", "O", "T", "N", "S", "L", "C"];
    const biases = [
      11.1607, 8.4966, 7.5809, 7.5448, 7.1635, 6.9509, 6.6544, 5.7351, 5.4893,
      4.5388,
    ];

    // Calculate the total bias of the provided letters
    const totalBias = biases.reduce((sum, bias) => sum + bias, 0);

    // Calculate the common bias for the remaining letters
    const remainingLetters = 26 - letters.length;

    const commonBias = (100 - totalBias) / remainingLetters;

    // Generate the weighted list of letters
    const weightedLetters = [];
    for (let i = 0; i < letters.length; i++) {
      weightedLetters.push({ letter: letters[i], bias: biases[i] });
    }
    for (let i = 0; i < remainingLetters; i++) {
      weightedLetters.push({ letter: "", bias: commonBias }); // Placeholder for remaining letters
    }

    // Generate a random number between 0 and total bias
    const randomBias = Math.random() * totalBias;

    // Find the letter corresponding to the random bias
    let cumulativeBias = 0;
    for (let i = 0; i < weightedLetters.length; i++) {
      cumulativeBias += weightedLetters[i].bias;
      if (randomBias <= cumulativeBias) {
        return weightedLetters[i].letter.toUpperCase();
      }
    }

    // This should never be reached, but just in case
    return "";
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const canPlaceWord = (word, row, col, dRow, dCol) => {
    if (col + word.length * dCol > cols || row + word.length * dRow > rows) {
      return false;
    }
    return true;
  };

  const swapAdjacentCells = (row, col, newBoard) => {
    const adjacentCells = [];
    if (row > 0) adjacentCells.push([row - 1, col]);
    if (row < rows - 1) adjacentCells.push([row + 1, col]);
    if (col > 0) adjacentCells.push([row, col - 1]);
    if (col < cols - 1) adjacentCells.push([row, col + 1]);

    const randomIndex = Math.floor(Math.random() * adjacentCells.length);
    const [adjRow, adjCol] = adjacentCells[randomIndex];
    const temp = newBoard[row][col];
    newBoard[row][col] = newBoard[adjRow][adjCol];
    newBoard[adjRow][adjCol] = temp;
    occupiedPositions.add(`${adjRow}-${adjCol}`);

    return newBoard;
  };

  const createRandomBoard = () => {
    let newBoard = [];
    for (let i = 0; i < rows; i++) {
      newBoard.push([]);
      for (let j = 0; j < cols; j++) {
        newBoard[i][j] = generateRandomLetter();
      }
    }
    return newBoard;
  };

  const generateBoard = () => {
    let newBoard = createRandomBoard();

    const horizontalWordsCount = Math.floor(Math.random() * 6);
    console.log(horizontalWordsCount);
    const verticalWordsCount = wordList.length - horizontalWordsCount;
    const shuffledWords = shuffleArray(wordList.slice());

    for (let i = 0; i < horizontalWordsCount; i++) {
      newBoard = placeRandomWord(shuffledWords[i], newBoard, true);
    }

    for (let i = horizontalWordsCount; i < wordList.length; i++) {
      newBoard = placeRandomWord(shuffledWords[i], newBoard, false);
    }
    setBoard(newBoard);
  };

  const occupiedPositions = new Set();
  let wordsAndPositions = new Object();
  const placeRandomWord = (word, newBoard, horizontal) => {
    let attempts = 0;
    let horBoard = newBoard.slice();
    console.log(wordsAndPositions);
    while (attempts < 1000) {
      const startRow = Math.floor(Math.random() * rows);
      const startCol = Math.floor(Math.random() * cols);
      let isOccupied = false;
      for (let i = 0; i < word.length; i++) {
        if (
          (occupiedPositions.has(`${startRow}-${startCol + i}`) &&
            horizontal) ||
          (occupiedPositions.has(`${startRow + i}-${startCol}`) && !horizontal)
        ) {
          isOccupied = true;
          break;
        }
      }
      if (
        !isOccupied &&
        horizontal &&
        canPlaceWord(word, startRow, startCol, 0, 1)
      ) {
        for (let i = 0; i < word.length; i++) {
          horBoard[startRow][startCol + i] = word[i].toUpperCase();
          occupiedPositions.add(`${startRow}-${startCol + i}`);
          wordsAndPositions[word] = `${startRow}-${startCol + i}`;
        }

        const randomIndex = Math.floor(Math.random() * word.length);
        horBoard = swapAdjacentCells(
          startRow,
          startCol + randomIndex,
          horBoard
        );

        return horBoard;
      } else if (
        !isOccupied &&
        !horizontal &&
        canPlaceWord(word, startRow, startCol, 1, 0)
      ) {
        for (let i = 0; i < word.length; i++) {
          newBoard[startRow + i][startCol] = word[i].toUpperCase();
          occupiedPositions.add(`${startRow + i}-${startCol}`); // Add occupied positions
          wordsAndPositions[word] = `${startRow + i}-${startCol}`;
        }
        const randomIndex = Math.floor(Math.random() * word.length);
        newBoard = swapAdjacentCells(
          startRow + randomIndex,
          startCol,
          newBoard
        );
        return newBoard;
      }
      attempts++;
    }
    console.error("Failed to place word:", word);
    return newBoard;
  };

  const printBoard = () => {
    for (let i = 0; i < rows; i++) {
      console.log(board[i].join(" "));
    }
  };

  return (
    <div className="board-container">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={rowIndex % 2 === 0 ? "even" : "odd"}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Example usage
const wordList = ["apple", "grape", "kiwi", "melon", "peach", "pear", "plum"];

export default Board;

// class Board {
//   constructor(rows, cols, wordList) {
//     this.rows = rows;
//     this.cols = cols;
//     this.board = [];
//     this.wordList = wordList;
//     this.realWordsCount = 10; // Number of real acceptable words
//     this.maxAttempts = 1000; // Maximum number of attempts to place a word
//     this.generateBoard();
//   }

//   generateBoard() {
//     // Initialize the board with random letters
//     for (let i = 0; i < this.rows; i++) {
//       this.board.push([]);
//       for (let j = 0; j < this.cols; j++) {
//         this.board[i][j] = this.generateRandomLetter();
//       }
//     }

//     // Randomly choose number of words to align horizontally
//     const horizontalWordsCount = Math.floor(Math.random() * (this.realWordsCount + 1));
//     const verticalWordsCount = this.realWordsCount - horizontalWordsCount;

//     // Place words horizontally
//     for (let i = 0; i < horizontalWordsCount; i++) {
//       this.placeRandomWord();
//     }

//     // Place words vertically
//     for (let i = 0; i < verticalWordsCount; i++) {
//       this.placeRandomWord();
//     }

//   }

//   generateRandomLetter() {
//     // Generates a random letter (a-z)
//     return String.fromCharCode(97 + Math.floor(Math.random() * 26));
//   }

//   placeRandomWord() {
//     // Choose a random word
//     const word = this.wordList[Math.floor(Math.random() * this.wordList.length)];

//     // Attempt to place the word
//     let attempts = 0;
//     while (attempts < this.maxAttempts) {
//       const startRow = Math.floor(Math.random() * this.rows);
//       const startCol = Math.floor(Math.random() * (this.cols - word.length + 1));
//       if (this.canPlaceWord(word, startRow, startCol, 0, 1)) {
//         // Place the word horizontally
//         for (let i = 0; i < word.length; i++) {
//           this.board[startRow][startCol + i] = word[i];
//         }

//         // Swap a random letter with an adjacent cell
//         const randomIndex = Math.floor(Math.random() * word.length);
//         this.swapAdjacentCells(startRow, startCol + randomIndex);
//         return; // Word placed successfully, exit the loop
//       }
//       attempts++;
//     }
//     console.error("Failed to place word:", word);
//   }

//   canPlaceWord(word, row, col, dRow, dCol) {
//     // Check if the word can be placed starting from the specified position with the given direction

//     if (col + word.length > this.cols) {
//       return false
//     }
//     return true; // Word can fit
//   }

//   swapAdjacentCells(row, col) {
//     // Get adjacent cells
//     const adjacentCells = [];
//     if (row > 0) adjacentCells.push([row - 1, col]); // Up
//     if (row < this.rows - 1) adjacentCells.push([row + 1, col]); // Down
//     if (col > 0) adjacentCells.push([row, col - 1]); // Left
//     if (col < this.cols - 1) adjacentCells.push([row, col + 1]); // Right

//     // Choose a random adjacent cell
//     const randomIndex = Math.floor(Math.random() * adjacentCells.length);
//     const [adjRow, adjCol] = adjacentCells[randomIndex];

//     // Swap letters between current cell and adjacent cell
//     const temp = this.board[row][col];
//     this.board[row][col] = this.board[adjRow][adjCol];
//     this.board[adjRow][adjCol] = temp;
//   }

//   printBoard() {
//     // Print the current state of the board
//     for (let i = 0; i < this.rows; i++) {
//       console.log(this.board[i].join(' '));
//     }
//   }
// }

// // Example usage
// const wordList = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'melon', 'peach', 'pear', 'plum', 'strawberry'];
// const game = new Board(7, 7, wordList);
// game.printBoard();
