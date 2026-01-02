import { useEffect, useState } from "react";
import "./ChessBoard.css";
import GameInfo from "./GameInfo.jsx";
import Square from "./Square.jsx";

const PIECES = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟",
};

const INITIAL_BOARD = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

function ChessBoard() {
  const [board, setBoard] = useState(INITIAL_BOARD.map((row) => [...row]));
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [gameMode, setGameMode] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [gameStatus, setGameStatus] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [isInCheck, setIsInCheck] = useState(false);

  const isWhitePiece = (piece) => piece && piece === piece.toUpperCase();
  const isBlackPiece = (piece) => piece && piece === piece.toLowerCase();

  const getPieceColor = (piece) => {
    if (!piece) return null;
    return isWhitePiece(piece) ? "white" : "black";
  };

  const findKing = (board, color) => {
    const kingPiece = color === "white" ? "K" : "k";
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === kingPiece) {
          return [r, c];
        }
      }
    }
    return null;
  };

  const isPathClear = (board, fromRow, fromCol, toRow, toCol) => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol] !== null) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    return true;
  };

  const isValidMoveBasic = (board, fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    const targetPiece = board[toRow][toCol];
    const pieceType = piece.toLowerCase();

    if (targetPiece && getPieceColor(piece) === getPieceColor(targetPiece)) {
      return false;
    }

    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    switch (pieceType) {
      case "p":
        const direction = isWhitePiece(piece) ? -1 : 1;
        const startRow = isWhitePiece(piece) ? 6 : 1;

        if (colDiff === 0 && !targetPiece) {
          if (rowDiff === direction) return true;
          if (
            fromRow === startRow &&
            rowDiff === 2 * direction &&
            !board[fromRow + direction][fromCol]
          ) {
            return true;
          }
        }
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece) {
          return true;
        }
        return false;

      case "r":
        if (rowDiff === 0 || colDiff === 0) {
          return isPathClear(board, fromRow, fromCol, toRow, toCol);
        }
        return false;

      case "n":
        return (
          (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
          (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)
        );

      case "b":
        if (Math.abs(rowDiff) === Math.abs(colDiff)) {
          return isPathClear(board, fromRow, fromCol, toRow, toCol);
        }
        return false;

      case "q":
        if (
          rowDiff === 0 ||
          colDiff === 0 ||
          Math.abs(rowDiff) === Math.abs(colDiff)
        ) {
          return isPathClear(board, fromRow, fromCol, toRow, toCol);
        }
        return false;

      case "k":
        return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;

      default:
        return false;
    }
  };

  const isSquareUnderAttack = (board, row, col, byColor) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && getPieceColor(piece) === byColor) {
          if (isValidMoveBasic(board, r, c, row, col)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const isKingInCheck = (board, color) => {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;

    const enemyColor = color === "white" ? "black" : "white";
    return isSquareUnderAttack(board, kingPos[0], kingPos[1], enemyColor);
  };

  const simulateMove = (board, fromRow, fromCol, toRow, toCol) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    return newBoard;
  };

  const isValidMove = (board, fromRow, fromCol, toRow, toCol) => {
    if (!isValidMoveBasic(board, fromRow, fromCol, toRow, toCol)) {
      return false;
    }

    const piece = board[fromRow][fromCol];
    const color = getPieceColor(piece);
    const newBoard = simulateMove(board, fromRow, fromCol, toRow, toCol);

    return !isKingInCheck(newBoard, color);
  };

  const getValidMoves = (board, row, col) => {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(board, row, col, r, c)) {
          moves.push([r, c]);
        }
      }
    }
    return moves;
  };

  const hasValidMoves = (board, color) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && getPieceColor(piece) === color) {
          const moves = getValidMoves(board, r, c);
          if (moves.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const checkGameStatus = (board, color) => {
    const inCheck = isKingInCheck(board, color);
    const hasLegalMoves = hasValidMoves(board, color);

    console.log("Checking game status for:", color);
    console.log("In check:", inCheck);
    console.log("Has legal moves:", hasLegalMoves);

    if (!hasLegalMoves) {
      if (inCheck) {
        const winner = color === "white" ? "Black" : "White";
        setGameStatus(`🏆 Checkmate! ${winner} wins! 🏆`);
        setIsInCheck(false);
        return "checkmate";
      } else {
        setGameStatus("🤝 Stalemate! Game is a draw. 🤝");
        setIsInCheck(false);
        return "stalemate";
      }
    } else if (inCheck) {
      setIsInCheck(true);
      setGameStatus("");
      return "check";
    } else {
      setIsInCheck(false);
      setGameStatus("");
      return "normal";
    }
  };

  const makeAIMove = () => {
    const blackPieces = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] && isBlackPiece(board[r][c])) {
          const moves = getValidMoves(board, r, c);
          if (moves.length > 0) {
            blackPieces.push({ row: r, col: c, moves });
          }
        }
      }
    }

    if (blackPieces.length === 0) {
      setGameStatus("🏆 Checkmate! White wins! 🏆");
      return;
    }

    const randomPiece =
      blackPieces[Math.floor(Math.random() * blackPieces.length)];
    const randomMove =
      randomPiece.moves[Math.floor(Math.random() * randomPiece.moves.length)];

    const newBoard = board.map((row) => [...row]);
    const piece = newBoard[randomPiece.row][randomPiece.col];
    newBoard[randomMove[0]][randomMove[1]] = piece;
    newBoard[randomPiece.row][randomPiece.col] = null;

    setBoard(newBoard);
    setCurrentPlayer("white");
    setMoveHistory([
      ...moveHistory,
      `AI: ${PIECES[piece]} to ${String.fromCharCode(97 + randomMove[1])}${
        8 - randomMove[0]
      }`,
    ]);

    setTimeout(() => checkGameStatus(newBoard, "white"), 100);
  };

  useEffect(() => {
    if (
      gameMode === "ai" &&
      currentPlayer === "black" &&
      !gameStatus.includes("Checkmate") &&
      !gameStatus.includes("Stalemate")
    ) {
      setTimeout(makeAIMove, 500);
    }
  }, [currentPlayer, gameMode]);

  const handleSquareClick = (row, col) => {
    if (gameStatus.includes("Checkmate") || gameStatus.includes("Stalemate"))
      return;
    if (gameMode === "ai" && currentPlayer === "black") return;

    const piece = board[row][col];

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const isValid = validMoves.some(([r, c]) => r === row && c === col);

      if (isValid) {
        const newBoard = board.map((row) => [...row]);
        const movedPiece = newBoard[selectedRow][selectedCol];
        newBoard[row][col] = movedPiece;
        newBoard[selectedRow][selectedCol] = null;

        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        const nextPlayer = currentPlayer === "white" ? "black" : "white";
        setCurrentPlayer(nextPlayer);
        setMoveHistory([
          ...moveHistory,
          `${currentPlayer}: ${PIECES[movedPiece]} to ${String.fromCharCode(
            97 + col
          )}${8 - row}`,
        ]);

        setTimeout(() => checkGameStatus(newBoard, nextPlayer), 100);
      } else {
        if (piece && getPieceColor(piece) === currentPlayer) {
          setSelectedSquare([row, col]);
          setValidMoves(getValidMoves(board, row, col));
        } else {
          setSelectedSquare(null);
          setValidMoves([]);
        }
      }
    } else {
      if (piece && getPieceColor(piece) === currentPlayer) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      }
    }
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD.map((row) => [...row]));
    setSelectedSquare(null);
    setCurrentPlayer("white");
    setValidMoves([]);
    setGameStatus("");
    setMoveHistory([]);
    setIsInCheck(false);
  };

  const startGame = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  if (!gameMode) {
    return (
      <div className="menu-container">
        <div className="menu-card">
          <h1 className="title">Chess Game</h1>
          <button className="menu-button" onClick={() => startGame("2player")}>
            2 Player Mode
          </button>
          <button className="menu-button" onClick={() => startGame("ai")}>
            Play vs AI
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <GameInfo
        gameMode={gameMode}
        currentPlayer={currentPlayer}
        gameStatus={gameStatus}
        moveHistory={moveHistory}
        isInCheck={isInCheck}
        onReset={resetGame}
        onBackToMenu={() => setGameMode(null)}
      />

      <div className="board-container">
        <div className="chess-board">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((piece, colIndex) => {
                const isSelected =
                  selectedSquare &&
                  selectedSquare[0] === rowIndex &&
                  selectedSquare[1] === colIndex;
                const isValidMoveSquare = validMoves.some(
                  ([r, c]) => r === rowIndex && c === colIndex
                );

                return (
                  <Square
                    key={colIndex}
                    piece={piece}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isSelected={isSelected}
                    isValidMove={isValidMoveSquare}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                    pieceSymbol={piece ? PIECES[piece] : null}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;
