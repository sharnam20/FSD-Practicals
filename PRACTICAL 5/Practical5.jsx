import React, { useState, useEffect } from "react";
import "./Practical5.css";

const Practical5 = () => {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitNew, setWaitNew] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const formatNumber = (num) => {
    if (num === "Error") return "Error";
    const n = Number(num);
    if (!isFinite(n)) return "Error";
    return parseFloat(n.toPrecision(12)).toString();
  };

  
  const handleNumber = (digit) => {
    if (display === "Error") {
      setDisplay(digit);
      setWaitNew(false);
    } else if (waitNew) {
      setDisplay(digit);
      setWaitNew(false);
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const handleDecimal = () => {
    if (display === "Error" || waitNew) {
      setDisplay("0.");
      setWaitNew(false);
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const calculate = (a, b, op) => {
    const x = Number(a);
    const y = Number(b);
    let r = 0;
    switch (op) {
      case "+": r = x + y; break;
      case "-": r = x - y; break;
      case "*": r = x * y; break;
      case "/": if (y === 0) return "Error"; r = x / y; break;
      default: return b;
    }
    return formatNumber(r);
  };

  const handleOperator = (opSymbol) => {
    const opToken = opSymbol === "×" ? "*" : opSymbol === "÷" ? "/" : opSymbol;
    if (display === "Error") return;

    if (prevValue === null) {
      setPrevValue(display);
      setOperator(opToken);
      setWaitNew(true);
    } else {
      if (!waitNew) {
        const result = calculate(prevValue, display, operator || opToken);
        setPrevValue(result === "Error" ? null : result);
        setDisplay(result);
      }
      setOperator(opToken);
      setWaitNew(true);
    }
  };

  const handleEquals = () => {
    if (!operator || !prevValue || display === "Error") return;
    const calculation = `${prevValue} ${operator} ${display}`;
    const result = calculate(prevValue, display, operator);
    
    // Add to history
    setHistory(prev => [{
      calculation,
      result,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 9)]); // Keep last 10 calculations
    
    setDisplay(result);
    setPrevValue(null);
    setOperator(null);
    setWaitNew(true);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitNew(false);
  };

  const handleBackspace = () => {
    if (display === "Error" || waitNew) {
      setDisplay("0");
      setWaitNew(false);
    } else {
      setDisplay((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
    }
  };

  const handleToggleSign = () => {
    if (display === "Error" || display === "0") return;
    setDisplay((prev) => formatNumber(Number(prev) * -1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) handleNumber(e.key);
      else if (e.key === ".") handleDecimal();
      else if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
      else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); handleEquals(); }
      else if (e.key === "Backspace") handleBackspace();
      else if (e.key === "Escape") handleClear();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, prevValue, operator, waitNew]);

  return (
    <div className={`calculator-app ${theme}`}>
      <div className="calculator-header">
        <h1>🧮 Smart Calculator</h1>
        <div className="header-controls">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
            📊
          </button>
        </div>
      </div>
      
      <div className="calculator-body">
        <div className="calculator">
          <div className="display">
            <div className="prev-display">
              {prevValue && operator ? `${prevValue} ${operator}` : ""}
            </div>
            <div className="current-display">{display}</div>
          </div>
          <div className="buttons">
            <button className="function" onClick={handleClear}>AC</button>
            <button className="function" onClick={handleToggleSign}>±</button>
            <button className="function" onClick={handleBackspace}>⌫</button>
            <button className="operator" onClick={() => handleOperator("÷")}>÷</button>
            <button className="number" onClick={() => handleNumber("7")}>7</button>
            <button className="number" onClick={() => handleNumber("8")}>8</button>
            <button className="number" onClick={() => handleNumber("9")}>9</button>
            <button className="operator" onClick={() => handleOperator("×")}>×</button>
            <button className="number" onClick={() => handleNumber("4")}>4</button>
            <button className="number" onClick={() => handleNumber("5")}>5</button>
            <button className="number" onClick={() => handleNumber("6")}>6</button>
            <button className="operator" onClick={() => handleOperator("-")}>−</button>
            <button className="number" onClick={() => handleNumber("1")}>1</button>
            <button className="number" onClick={() => handleNumber("2")}>2</button>
            <button className="number" onClick={() => handleNumber("3")}>3</button>
            <button className="operator" onClick={() => handleOperator("+")}>+</button>
            <button className="zero number" onClick={() => handleNumber("0")}>0</button>
            <button className="number" onClick={handleDecimal}>.</button>
            <button className="equals" onClick={handleEquals}>=</button>
          </div>
        </div>
        
        {showHistory && (
          <div className="history-panel">
            <div className="history-header">
              <h3>📈 History</h3>
              <button className="clear-history" onClick={clearHistory}>🗑️</button>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <div className="no-history">No calculations yet</div>
              ) : (
                history.map((item, index) => (
                  <div key={index} className="history-item">
                    <div className="calculation">{item.calculation}</div>
                    <div className="result">= {item.result}</div>
                    <div className="timestamp">{item.timestamp}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practical5;
