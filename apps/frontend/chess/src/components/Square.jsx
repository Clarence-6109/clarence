function Square({
  piece,
  rowIndex,
  colIndex,
  isSelected,
  isValidMove,
  onClick,
  pieceSymbol,
}) {
  const isLight = (rowIndex + colIndex) % 2 === 0;

  const squareStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxSizing: "border-box",
    cursor: "pointer",
    backgroundColor: isSelected ? "#7fc97f" : isLight ? "#f0d9b5" : "#b58863",
    border: isValidMove ? `clamp(2px, 0.4vw, 4px) solid #4CAF50` : "none",
    transition: "background-color 0.2s ease",
  };

  const pieceStyle = {
    fontSize: "clamp(20px, 4vw, 55px)",
    userSelect: "none",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const validMoveIndicatorStyle = {
    position: "absolute",
    width: "clamp(10px, 2vw, 18px)",
    height: "clamp(10px, 2vw, 18px)",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    opacity: 0.7,
  };

  return (
    <div style={squareStyle} onClick={onClick}>
      {pieceSymbol && <span style={pieceStyle}>{pieceSymbol}</span>}
      {isValidMove && <div style={validMoveIndicatorStyle}></div>}
    </div>
  );
}

export default Square;
