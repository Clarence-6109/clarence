import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diags
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isAI, setIsAI] = useState(false);

  const checkWinner = useCallback((newBoard) => {
    for (let pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return newBoard.every((cell) => cell) ? "draw" : null;
  }, []);

  const minimax = useCallback(
    (boardCopy, depth, isMaximizing) => {
      let result = checkWinner(boardCopy);
      if (result === "O") return 10 - depth; // AI win
      if (result === "X") return depth - 10; // Player win
      if (result === "draw") return 0;

      let bestScore = isMaximizing ? -Infinity : Infinity;
      for (let i = 0; i < 9; i++) {
        if (!boardCopy[i]) {
          boardCopy[i] = isMaximizing ? "O" : "X";
          let score = minimax(boardCopy, depth + 1, !isMaximizing);
          boardCopy[i] = null;
          bestScore = isMaximizing
            ? Math.max(score, bestScore)
            : Math.min(score, bestScore);
        }
      }
      return bestScore;
    },
    [checkWinner]
  );

  const bestMove = useCallback(() => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        let tempBoard = [...board];
        tempBoard[i] = "O";
        let score = minimax(tempBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }, [board, minimax]);

  const handleClick = useCallback(
    (index) => {
      if (board[index] || winner || isDraw || (isAI && currentPlayer === "O"))
        return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      const result = checkWinner(newBoard);
      setBoard(newBoard);

      if (result) {
        if (result === "draw") {
          setIsDraw(true);
        } else {
          setWinner(result);
          setScores((prev) => ({ ...prev, [result]: prev[result] + 1 }));
        }
        return;
      }

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    },
    [board, currentPlayer, winner, isDraw, isAI, checkWinner]
  );

  const handleAIMove = useCallback(() => {
    const move = bestMove();
    if (move === undefined) return;

    const newBoard = [...board];
    newBoard[move] = "O";
    const result = checkWinner(newBoard);
    setBoard(newBoard);

    if (result) {
      if (result === "draw") {
        setIsDraw(true);
      } else {
        setWinner(result);
        setScores((prev) => ({ ...prev, [result]: prev[result] + 1 }));
      }
      return;
    }

    setCurrentPlayer("X");
  }, [board, bestMove, checkWinner]);

  // Auto AI move on O's turn
  useEffect(() => {
    if (isAI && currentPlayer === "O" && !winner && !isDraw) {
      const timer = setTimeout(handleAIMove, 300); // Smooth delay
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, isAI, winner, isDraw, handleAIMove]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const statusMessage = winner
    ? `${winner} Wins!`
    : isDraw
    ? "It's a Draw!"
    : `It's ${currentPlayer}'s turn`;

  return (
    <div className="app">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="title"
      >
        Tic-Tac-Toe
      </motion.h1>

      <div className="controls">
        <div className="mode-buttons">
          <motion.button
            className={`mode-btn ${!isAI ? "active" : ""}`}
            onClick={() => {
              if (isAI) {
                setIsAI(false);
                resetGame();
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            2 Player
          </motion.button>
          <motion.button
            className={`mode-btn ${isAI ? "active" : ""}`}
            onClick={() => {
              if (!isAI) {
                setIsAI(true);
                resetGame();
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            vs AI
          </motion.button>
        </div>
        <div className="scores">
          <span>X: {scores.X}</span>
          <span>O: {scores.O}</span>
        </div>
      </div>

      <div className="status">{statusMessage}</div>

      <div className="board">
        {board.map((cell, index) => (
          <motion.button
            key={index}
            className={`cell ${cell || ""} ${
              winner && cell === winner ? "won" : ""
            }`}
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!!winner || isDraw || (isAI && currentPlayer === "O")}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {(winner || isDraw) && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button onClick={resetGame} className="reset-btn">
              New Game
            </motion.button>
            <motion.button onClick={resetScores} className="reset-scores-btn">
              Reset Scores
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
