import { evaluate } from "mathjs"; // ← Critical: don't forget this!
import { useContext, useState } from "react";
import { FaBolt, FaMoon, FaSun } from "react-icons/fa";
import "./App.css";
import { ThemeContext } from "./ThemeContext.jsx"; // ← make sure .jsx extension if needed

export default function App() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRad, setIsRad] = useState(true);
  const [isHyp, setIsHyp] = useState(false);

  const appendToExpression = (value) => {
    if (expression.endsWith("=")) {
      setExpression(value);
      setDisplay(value);
    } else {
      setExpression(expression + value);
      setDisplay(display + value);
    }
  };

  const handleDigit = (val) => {
    if (display === "0" || expression.endsWith("=")) {
      setDisplay(val);
      setExpression(val);
    } else {
      setDisplay(display + val);
      setExpression(expression + val);
    }
  };

  const handleOperator = (op) => appendToExpression(op);

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleBackspace = () => {
    if (expression.endsWith("=")) {
      handleClear();
    } else {
      const newExpr = expression.slice(0, -1);
      setExpression(newExpr);
      setDisplay(newExpr || "0");
    }
  };

  const handleEqual = () => {
    try {
      let expr = expression;

      if (!isRad) {
        expr = expr
          .replace(/\bsin\(/g, "sin(deg(")
          .replace(/\bcos\(/g, "cos(deg(")
          .replace(/\btan\(/g, "tan(deg(")
          .replace(/\basin\(/g, "asin(deg(")
          .replace(/\bacos\(/g, "acos(deg(")
          .replace(/\batan\(/g, "atan(deg(");
      }

      const result = evaluate(expr);
      const resultStr = result.toString();
      setDisplay(resultStr);
      setExpression(expression + "=" + resultStr);
    } catch (e) {
      setDisplay("Error");
      setExpression(expression + "=Error");
    }
  };

  const handleFunction = (func) => {
    let f = func;
    if (isHyp) {
      if (!func.startsWith("a")) {
        f = func
          .replace("sin", "sinh")
          .replace("cos", "cosh")
          .replace("tan", "tanh");
      }
      setIsHyp(false);
    }
    appendToExpression(f + "(");
  };

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("neon");
    else setTheme("dark");
  };

  const getButtonClass = (btn) => {
    const functions = [
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "sinh",
      "asinh",
      "cosh",
      "acosh",
      "tanh",
      "atanh",
      "ln",
      "log",
      "√",
      "ʸ√",
    ];
    const operators = ["+", "-", "*", "/", "^", "xʸ", "x²"];
    const controls = ["C", "←", "Hyp", "Deg/Rad"];

    if (functions.includes(btn)) return "btn function";
    if (operators.includes(btn)) return "btn operator";
    if (controls.includes(btn)) return "btn control";
    if (btn === "=") return "btn equals";
    return "btn";
  };

  const buttons = [
    ["Hyp", "Deg/Rad", "C", "←"],
    ["π", "e", "(", ")"],
    ["x²", "xʸ", "√", "ʸ√"],
    ["sin", "asin", "cos", "acos"],
    ["tan", "atan", "ln", "log"],
    ["sinh", "asinh", "cosh", "acosh"],
    ["tanh", "atanh", "!", "1/x"],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "+", "="],
  ];

  const handleButtonClick = (btn) => {
    if ("0123456789.".includes(btn)) handleDigit(btn);
    else if ("+-*/".includes(btn)) handleOperator(btn);
    else if (btn === "C") handleClear();
    else if (btn === "←") handleBackspace();
    else if (btn === "=") handleEqual();
    else if (btn === "Hyp") setIsHyp(!isHyp);
    else if (btn === "Deg/Rad") setIsRad(!isRad);
    else if (btn === "π") handleDigit("pi");
    else if (btn === "e") handleDigit("e");
    else if (btn === "x²") appendToExpression("^2");
    else if (btn === "xʸ") appendToExpression("^");
    else if (btn === "√") appendToExpression("sqrt(");
    else if (btn === "ʸ√") appendToExpression("root(");
    else if (btn === "ln") appendToExpression("ln(");
    else if (btn === "log") appendToExpression("log10(");
    else if (btn === "!") appendToExpression("!");
    else if (btn === "1/x") appendToExpression("1/");
    else if (btn === "(" || btn === ")") appendToExpression(btn);
    else handleFunction(btn);
  };

  return (
    <div className="calculator">
      <div className="header">
        <h1>Hyper-Scientific Calc</h1>
        <div className="theme-toggle">
          <FaSun style={{ color: theme === "light" ? "gold" : "" }} />
          <FaMoon style={{ color: theme === "dark" ? "#aaa" : "" }} />
          <FaBolt style={{ color: theme === "neon" ? "#00ffcc" : "" }} />
          <div className="theme-slider" onClick={toggleTheme}>
            <div className={`theme-knob ${theme}`}></div>
          </div>
        </div>
      </div>

      <div className="display">
        <div className="mode">
          <span>{isRad ? "RAD" : "DEG"}</span>
          {isHyp && (
            <span style={{ marginLeft: 8, color: "var(--accent)" }}>HYP</span>
          )}
        </div>
        <div className="expression">{expression || "\u00A0"}</div>
        <div className="result">{display}</div>
      </div>

      <div className="buttons">
        {buttons.flat().map((btn, i) => (
          <button
            key={i}
            className={getButtonClass(btn)}
            onClick={() => handleButtonClick(btn)}
            aria-label={btn}
          >
            {btn === "←" ? "⌫" : btn}
          </button>
        ))}
      </div>
    </div>
  );
}
