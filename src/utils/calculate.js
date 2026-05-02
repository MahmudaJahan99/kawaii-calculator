// ============================================
//  KAWAII CALC — Pure Calculation Utilities
// ============================================

// Decimal places and significant digits are limited to keep results concise
const MAX_DIGITS = 9;

// Runs the actual arithmetic between two numbers.
// Returns null if the operation is invalid
export function applyOperator(a, b, operator) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "*":
      return numA * numB;
    case "/":
      if (numB === 0) return null;
      return numA / numB;
    default:
      return null;
  }
}

// Formats a number for display, handling edge cases and limiting length.
export function formatDisplay(value) {
  if (value === null || value === undefined) return "Error";
  if (value === "Error") return "Error";

  const num = parseFloat(value);

  if (isNaN(num)) return "Error";
  if (!isFinite(num)) return "Error";

  // If the number has too many digits, use toPrecision
  const str = num.toString();
  if (str.replace(".", "").replace("-", "").length > MAX_DIGITS) {
    return parseFloat(num.toPrecision(MAX_DIGITS)).toString();
  }

  return str;
}

// Applies the % key. On a standalone number it divides by 100, but in the context of an operator it calculates the percentage of the previous number.
export function applyPercent(current, previous, operator) {
  const num = parseFloat(current);

  // Contextual percent: 200 + 10% means 10% of 200
  if (operator && previous !== null) {
    return (parseFloat(previous) * num) / 100;
  }

  // Standalone percent: just divide by 100
  return num / 100;
}

// Toggles a number between positive and negative.
export function applyNegate(current) {
  const num = parseFloat(current);
  if (num === 0) return "0";
  return (num * -1).toString();
}
