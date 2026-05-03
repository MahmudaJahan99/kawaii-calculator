// ============================================
//  States and Event handling
// ============================================
import { useState, useEffect, useCallback, useRef } from "react";
import {
  applyOperator,
  applyPercent,
  applyNegate,
  formatDisplay,
} from "../utils/calculate";

// Clean/Reset calculator state
const INITIAL_STATE = {
  currentInput: "0",
  previousInput: null,
  operator: null,
  waitingForNext: false,
};

export function useCalculator() {
  // The main state object for the calculator
  const [calcState, setCalcState] = useState(INITIAL_STATE);

  // Active key for visual feedback on keyboard input
  const [activeKey, setActiveKey] = useState(null);

  // Destructure for cleaner reading below
  const { currentInput, previousInput, operator, waitingForNext } = calcState;

  // Helper to update multiple fields in the state at once
  const update = (fields) => setCalcState((prev) => ({ ...prev, ...fields }));

  // ================================================
  //  HANDLE NUMBER & DECIMAL INPUT
  // ================================================
  const handleNumber = (value) => {
    // --- Decimal guard ---
    if (value === "." && currentInput.includes(".")) return;

    // --- Max digit guard ---
    if (
      !waitingForNext &&
      currentInput.replace(".", "").replace("-", "").length >= 9
    )
      return;

    if (waitingForNext) {
      // Start a fresh number — operator was just pressed
      update({
        currentInput: value === "." ? "0." : value,
        waitingForNext: false,
      });
    } else {
      // Append to the current number
      const newInput =
        currentInput === "0" && value !== "." ? value : currentInput + value;

      update({ currentInput: newInput });
    }
  };

  // ================================================
  //  HANDLE OPERATOR (+, -, *, /)
  // ================================================
  const handleOperator = (value) => {
    //    If operator is pressed right after another operator, just update it
    if (operator && waitingForNext) {
      update({ operator: value });
      return;
    }

    //   If there's an existing operator and previous input, compute the result first
    if (operator && previousInput !== null) {
      const result = applyOperator(previousInput, currentInput, operator);
      const formatted = formatDisplay(result);

      update({
        currentInput: formatted,
        previousInput: formatted,
        operator: value,
        waitingForNext: true,
      });
      return;
    }

    // Fresh operator press: save current as previous
    update({
      previousInput: currentInput,
      operator: value,
      waitingForNext: true,
    });
  };

  // ================================================
  //  HANDLE EQUALS
  // ================================================
  const handleEquals = () => {
    // Nothing to compute if there's no operator
    if (!operator || previousInput === null) return;

    const result = applyOperator(previousInput, currentInput, operator);
    const formatted = formatDisplay(result);

    // After equals, show the result and reset previous/operator for a fresh start
    update({
      currentInput: formatted,
      previousInput: null,
      operator: null,
      waitingForNext: true,
    });
  };

  // ================================================
  //  HANDLE ACTION BUTTONS (AC, +/-, %)
  // ================================================
  const handleAction = (value) => {
    switch (value) {
      case "AC":
        // Full reset — spread INITIAL_STATE in fresh
        setCalcState({ ...INITIAL_STATE });
        break;

      case "+/-":
        update({ currentInput: applyNegate(currentInput) });
        break;

      case "%":
        update({
          currentInput: applyPercent(
            currentInput,
            previousInput,
            operator,
          ).toString(),
        });
        break;

      default:
        break;
    }
  };

  // ================================================
  //  MAIN DISPATCHER
  // ================================================
  const handleButtonPress = useCallback(
    (value) => {
      // Numbers and decimal point
      if (!isNaN(value) || value === ".") {
        handleNumber(value);
        return;
      }

      // Operators
      if (["+", "-", "*", "/"].includes(value)) {
        handleOperator(value);
        return;
      }

      // Equals
      if (value === "=") {
        handleEquals();
        return;
      }

      // Actions (AC, +/-, %)
      handleAction(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calcState],
  );

  const handleButtonPressRef = useRef(handleButtonPress);
  useEffect(() => {
    handleButtonPressRef.current = handleButtonPress;
  }, [handleButtonPress]);

  // ================================================
  //  RETURN — the public API of this hook
  // ================================================

  //   The expression string shown above the current input, e.g. "200 +"
  const expression =
    previousInput && operator ? `${previousInput} ${operator}` : "";

  // ================================================
  //  KEYBOARD SUPPORT
  // ================================================
  useEffect(() => {
    const KEY_MAP = {
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      ".": ".",
      "+": "+",
      "-": "-",
      "*": "*",
      "/": "/",
      Enter: "=",
      "=": "=",
      Escape: "AC",
      Backspace: "AC",
      "%": "%",
    };

    const handleKeyDown = (e) => {
      const mapped = KEY_MAP[e.key];

      if (mapped === undefined) return;

      e.preventDefault();

      setActiveKey(mapped);
      handleButtonPressRef.current(mapped);
    };

    const handleKeyUp = () => setActiveKey(null)

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup — removes the listener if the component ever unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return {
    displayValue: currentInput,
    expression,
    handleButtonPress,
    activeKey,
  };
}
