import { useMemo, useState } from "react";

// Unit conversion data
const unitCategories = {
  length: {
    name: "Length",
    icon: "📏",
    units: {
      meter: { name: "Meter", symbol: "m", toBase: 1 },
      kilometer: { name: "Kilometer", symbol: "km", toBase: 1000 },
      centimeter: { name: "Centimeter", symbol: "cm", toBase: 0.01 },
      millimeter: { name: "Millimeter", symbol: "mm", toBase: 0.001 },
      mile: { name: "Mile", symbol: "mi", toBase: 1609.344 },
      yard: { name: "Yard", symbol: "yd", toBase: 0.9144 },
      foot: { name: "Foot", symbol: "ft", toBase: 0.3048 },
      inch: { name: "Inch", symbol: "in", toBase: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    icon: "⚖️",
    units: {
      kilogram: { name: "Kilogram", symbol: "kg", toBase: 1 },
      gram: { name: "Gram", symbol: "g", toBase: 0.001 },
      milligram: { name: "Milligram", symbol: "mg", toBase: 0.000001 },
      pound: { name: "Pound", symbol: "lb", toBase: 0.453592 },
      ounce: { name: "Ounce", symbol: "oz", toBase: 0.0283495 },
      ton: { name: "Metric Ton", symbol: "t", toBase: 1000 },
    },
  },
  temperature: {
    name: "Temperature",
    icon: "🌡️",
    units: {
      celsius: { name: "Celsius", symbol: "°C" },
      fahrenheit: { name: "Fahrenheit", symbol: "°F" },
      kelvin: { name: "Kelvin", symbol: "K" },
    },
  },
  volume: {
    name: "Volume",
    icon: "🫙",
    units: {
      liter: { name: "Liter", symbol: "L", toBase: 1 },
      milliliter: { name: "Milliliter", symbol: "mL", toBase: 0.001 },
      gallon: { name: "Gallon (US)", symbol: "gal", toBase: 3.78541 },
      quart: { name: "Quart", symbol: "qt", toBase: 0.946353 },
      pint: { name: "Pint", symbol: "pt", toBase: 0.473176 },
      cup: { name: "Cup", symbol: "cup", toBase: 0.236588 },
      cubicMeter: { name: "Cubic Meter", symbol: "m³", toBase: 1000 },
    },
  },
  area: {
    name: "Area",
    icon: "📐",
    units: {
      squareMeter: { name: "Square Meter", symbol: "m²", toBase: 1 },
      squareKilometer: {
        name: "Square Kilometer",
        symbol: "km²",
        toBase: 1000000,
      },
      squareFoot: { name: "Square Foot", symbol: "ft²", toBase: 0.092903 },
      squareYard: { name: "Square Yard", symbol: "yd²", toBase: 0.836127 },
      acre: { name: "Acre", symbol: "ac", toBase: 4046.86 },
      hectare: { name: "Hectare", symbol: "ha", toBase: 10000 },
    },
  },
  speed: {
    name: "Speed",
    icon: "🚀",
    units: {
      meterPerSecond: { name: "Meter/Second", symbol: "m/s", toBase: 1 },
      kilometerPerHour: {
        name: "Kilometer/Hour",
        symbol: "km/h",
        toBase: 0.277778,
      },
      milePerHour: { name: "Mile/Hour", symbol: "mph", toBase: 0.44704 },
      knot: { name: "Knot", symbol: "kn", toBase: 0.514444 },
      footPerSecond: { name: "Foot/Second", symbol: "ft/s", toBase: 0.3048 },
    },
  },
};

// Temperature conversion functions
function convertTemperature(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value;

  // Convert to Celsius first
  let celsius;
  switch (fromUnit) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }

  // Convert from Celsius to target
  switch (toUnit) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// General conversion function
function convert(value, fromUnit, toUnit, category) {
  if (category === "temperature") {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const units = unitCategories[category].units;
  const baseValue = value * units[fromUnit].toBase;
  return baseValue / units[toUnit].toBase;
}

// Format number for display
function formatNumber(num) {
  if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1000000) {
    return num.toExponential(4);
  }
  return parseFloat(num.toPrecision(8)).toString();
}

function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");

  // Get current units for selected category
  const currentUnits = unitCategories[category].units;

  // Update units when category changes
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const units = Object.keys(unitCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue("1");
  };

  // Swap units
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Calculate result
  const result = useMemo(() => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return "0";
    return formatNumber(convert(numValue, fromUnit, toUnit, category));
  }, [inputValue, fromUnit, toUnit, category]);

  // Get formula text
  const getFormula = () => {
    const fromSymbol = currentUnits[fromUnit].symbol;
    const toSymbol = currentUnits[toUnit].symbol;

    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        return `${fromSymbol} × 9/5 + 32 = ${toSymbol}`;
      }
      if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        return `(${fromSymbol} - 32) × 5/9 = ${toSymbol}`;
      }
      if (fromUnit === "celsius" && toUnit === "kelvin") {
        return `${fromSymbol} + 273.15 = ${toSymbol}`;
      }
      if (fromUnit === "kelvin" && toUnit === "celsius") {
        return `${fromSymbol} - 273.15 = ${toSymbol}`;
      }
      return `Convert through Celsius`;
    }

    const ratio = currentUnits[fromUnit].toBase / currentUnits[toUnit].toBase;
    return `1 ${fromSymbol} = ${formatNumber(ratio)} ${toSymbol}`;
  };

  return (
    <div className="converter-card">
      <div className="category-tabs">
        {Object.entries(unitCategories).map(([key, cat]) => (
          <button
            key={key}
            className={`tab-btn ${category === key ? "active" : ""}`}
            onClick={() => handleCategoryChange(key)}
          >
            <span className="tab-icon">{cat.icon}</span>
            <span className="tab-name">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="input-group">
        <label>From</label>
        <div className="input-row">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {Object.entries(currentUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.symbol} - {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="swap-btn">
        <button onClick={handleSwap} title="Swap units">
          ⇅
        </button>
      </div>

      <div className="input-group">
        <label>To</label>
        <div className="input-row">
          <input type="text" value={result} readOnly />
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.entries(currentUnits).map(([key, unit]) => (
              <option key={key} value={key}>
                {unit.symbol} - {unit.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="result-box">
        <div className="result-label">Result</div>
        <div className="result-value">
          {inputValue || "0"} {currentUnits[fromUnit].symbol} = {result}{" "}
          {currentUnits[toUnit].symbol}
        </div>
        <div className="result-unit">
          {currentUnits[fromUnit].name} to {currentUnits[toUnit].name}
        </div>
      </div>

      <div className="formula">
        <strong>Formula:</strong> {getFormula()}
      </div>
    </div>
  );
}

export default UnitConverter;
