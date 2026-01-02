function GameInfo({
  gameMode,
  currentPlayer,
  gameStatus,
  moveHistory,
  isInCheck,
  onReset,
  onBackToMenu,
}) {
  const containerStyle = {
    backgroundColor: "white",
    padding: "clamp(12px, 2vw, 25px)",
    borderRadius: "clamp(8px, 1.5vw, 12px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "clamp(220px, 25vw, 280px)",
    maxWidth: "clamp(280px, 30vw, 400px)",
    width: "100%",
    height: "fit-content",
  };

  const subtitleStyle = {
    fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
    marginBottom: "clamp(10px, 2vw, 18px)",
    color: "#2c3e50",
    fontWeight: "bold",
  };

  const statusBoxStyle = {
    backgroundColor: isInCheck ? "#ffe6e6" : "#ecf0f1",
    padding: "clamp(12px, 2vw, 18px)",
    borderRadius: "clamp(5px, 1vw, 8px)",
    marginBottom: "clamp(12px, 2vw, 18px)",
    border: isInCheck ? "clamp(2px, 0.3vw, 3px) solid #e74c3c" : "none",
    transition: "all 0.3s ease",
  };

  const statusTextStyle = {
    margin: "5px 0",
    fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
    color: "#2c3e50",
  };

  const checkWarningStyle = {
    marginTop: "clamp(8px, 1.5vw, 12px)",
    fontSize: "clamp(1rem, 2vw, 1.4rem)",
    fontWeight: "bold",
    color: "#e74c3c",
    animation: "pulse 1s infinite",
    textAlign: "center",
  };

  const gameStatusStyle = {
    marginTop: "clamp(8px, 1.5vw, 12px)",
    fontSize: "clamp(1rem, 2vw, 1.4rem)",
    fontWeight: "bold",
    color: "#27ae60",
    textAlign: "center",
    animation: "bounce 0.5s ease-in-out",
    lineHeight: 1.4,
  };

  const buttonStyle = {
    width: "100%",
    padding: "clamp(10px, 1.8vw, 14px) clamp(15px, 2vw, 20px)",
    margin: "clamp(5px, 1vw, 8px) 0",
    fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: "clamp(5px, 1vw, 8px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
  };

  const historyBoxStyle = {
    marginTop: "clamp(15px, 2.5vw, 25px)",
    backgroundColor: "#ecf0f1",
    padding: "clamp(10px, 1.5vw, 15px)",
    borderRadius: "clamp(5px, 1vw, 8px)",
    maxHeight: "clamp(150px, 25vh, 250px)",
    overflowY: "auto",
  };

  const historyTitleStyle = {
    fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
    marginBottom: "clamp(8px, 1.5vw, 12px)",
    color: "#2c3e50",
    fontWeight: "bold",
  };

  const historyListStyle = {
    fontSize: "clamp(0.8rem, 1.4vw, 1rem)",
  };

  const historyItemStyle = {
    padding: "clamp(3px, 0.5vw, 5px) 0",
    color: "#34495e",
    borderBottom: "1px solid #d5d5d5",
    lineHeight: 1.4,
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.08); }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          
          button:hover {
            background-color: #27ae60 !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          button:active {
            transform: translateY(0);
          }
          
          /* Custom scrollbar */
          div::-webkit-scrollbar {
            width: clamp(6px, 0.8vw, 10px);
          }
          
          div::-webkit-scrollbar-track {
            background: #d5d5d5;
            border-radius: 10px;
          }
          
          div::-webkit-scrollbar-thumb {
            background: #95a5a6;
            border-radius: 10px;
          }
          
          div::-webkit-scrollbar-thumb:hover {
            background: #7f8c8d;
          }
          
          /* Phone portrait mode */
          @media (max-width: 480px) and (orientation: portrait) {
            .game-info-container {
              min-width: 90vw;
              max-width: 90vw;
            }
          }
          
          /* Large screens (TV) */
          @media (min-width: 1921px) {
            button {
              font-size: 1.3rem !important;
              padding: 16px 24px !important;
            }
          }
        `}
      </style>
      <h2 style={subtitleStyle}>
        {gameMode === "ai" ? "🤖 Playing vs AI" : "👥 2 Player Mode"}
      </h2>
      <div style={statusBoxStyle}>
        <p style={statusTextStyle}>
          Current Turn: <strong>{currentPlayer.toUpperCase()}</strong>
        </p>
        {isInCheck && !gameStatus && (
          <p style={checkWarningStyle}>⚠️ CHECK! ⚠️</p>
        )}
        {gameStatus && <p style={gameStatusStyle}>{gameStatus}</p>}
      </div>
      <button style={buttonStyle} onClick={onReset}>
        🔄 Reset Game
      </button>
      <button style={buttonStyle} onClick={onBackToMenu}>
        🏠 Back to Menu
      </button>
      <div style={historyBoxStyle}>
        <h3 style={historyTitleStyle}>📜 Move History</h3>
        <div style={historyListStyle}>
          {moveHistory.length === 0 ? (
            <div style={historyItemStyle}>No moves yet...</div>
          ) : (
            moveHistory
              .slice(-10)
              .reverse()
              .map((move, idx) => (
                <div key={idx} style={historyItemStyle}>
                  {moveHistory.length - idx}. {move}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GameInfo;
