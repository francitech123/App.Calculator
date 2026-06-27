// src/utils/calculatorLogic.js

export const evaluateExpression = (expression) => {
  try {
    // Replace display symbols with JavaScript operators
    let sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e(?![xp])/g, `(${Math.E})`)
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/x²/g, '**2')
      .replace(/x³/g, '**3')
      .replace(/\^/g, '**');

    // Safety check - only allow safe characters
    const safePattern = /^[\d+\-*/().Math.sincotaglEe\s]+$/;
    if (!safePattern.test(sanitized)) {
      return 'Error';
    }

    // Evaluate the expression
    const result = Function(`"use strict"; return (${sanitized})`)();
    
    // Check if result is valid number
    if (typeof result !== 'number' || !isFinite(result)) {
      return 'Error';
    }
    
    return String(result);
  } catch (error) {
    return 'Error';
  }
};

export const formatNumber = (num) => {
  if (num === 'Error') return 'Error';
  if (!num) return '0';
  
  const number = parseFloat(num);
  if (isNaN(number)) return '0';
  
  // For very large or small numbers, use exponential notation
  if (Math.abs(number) > 1e15 || (Math.abs(number) < 1e-10 && number !== 0)) {
    return number.toExponential(6);
  }
  
  // Limit to 12 characters total
  let result = String(number);
  if (result.length > 12) {
    result = number.toExponential(6);
  }
  
  return result;
};

export const isOperator = (char) => {
  return ['+', '-', '×', '÷'].includes(char);
};

export const isDigit = (char) => {
  return /[0-9.]/.test(char);
};
