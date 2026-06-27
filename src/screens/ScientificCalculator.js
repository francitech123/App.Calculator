// src/screens/ScientificCalculator.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Display from '../components/Display';
import Button from '../components/Button';
import { evaluateExpression, formatNumber } from '../utils/calculatorLogic';

const ScientificCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [history, setHistory] = useState('');

  const handlePress = (value) => {
    // Clear All
    if (value === 'AC') {
      setExpression('');
      setResult('0');
      setHistory('');
      return;
    }

    // Clear Last
    if (value === 'C') {
      setExpression(expression.slice(0, -1));
      if (expression.length <= 1) {
        setResult('0');
      }
      return;
    }

    // Equals
    if (value === '=') {
      if (!expression) return;
      try {
        const evalResult = evaluateExpression(expression);
        const formatted = formatNumber(evalResult);
        setHistory(`${expression} =`);
        setResult(formatted);
        setExpression(formatted);
      } catch (error) {
        setResult('Error');
        setExpression('');
      }
      return;
    }

    // Scientific functions
    const scientificFunctions = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', '√('];
    if (scientificFunctions.includes(value)) {
      setExpression(expression + value);
      return;
    }

    // Constants
    if (value === 'π') {
      setExpression(expression + 'π');
      return;
    }
    if (value === 'e') {
      setExpression(expression + 'e');
      return;
    }

    // Power functions
    if (value === 'x²') {
      setExpression(expression + 'x²');
      return;
    }
    if (value === 'x³') {
      setExpression(expression + 'x³');
      return;
    }
    if (value === 'xⁿ') {
      setExpression(expression + '^');
      return;
    }

    // Parentheses
    if (value === '(' || value === ')') {
      setExpression(expression + value);
      return;
    }

    // Plus/Minus
    if (value === '±') {
      if (!expression) return;
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
      return;
    }

    // Prevent multiple operators
    const operators = ['+', '-', '×', '÷'];
    const lastChar = expression.slice(-1);
    if (operators.includes(value) && operators.includes(lastChar)) {
      setExpression(expression.slice(0, -1) + value);
      return;
    }

    // Prevent multiple decimals
    if (value === '.') {
      const lastNumber = expression.split(/[\+\-\×\÷\(\)]/).pop();
      if (lastNumber && lastNumber.includes('.')) {
        return;
      }
    }

    // Update expression
    const newExpression = expression + value;
    setExpression(newExpression);
    
    // Live preview
    try {
      const preview = evaluateExpression(newExpression);
      if (preview !== 'Error') {
        setResult(formatNumber(preview));
      }
    } catch (error) {
      // Don't update result on error during typing
    }
  };

  const renderRow = (buttons) => (
    <View style={styles.row}>
      {buttons.map(({ label, type, width }) => (
        <Button
          key={label}
          label={label}
          onPress={() => handlePress(label)}
          type={type}
          width={width || 1}
        />
      ))}
    </View>
  );

  const buttonRows = [
    [
      { label: '(', type: 'scientific' },
      { label: ')', type: 'scientific' },
      { label: 'C', type: 'function' },
      { label: 'AC', type: 'clear' },
    ],
    [
      { label: 'x²', type: 'scientific' },
      { label: 'x³', type: 'scientific' },
      { label: 'xⁿ', type: 'scientific' },
      { label: '√(', type: 'scientific' },
    ],
    [
      { label: 'sin(', type: 'scientific' },
      { label: 'cos(', type: 'scientific' },
      { label: 'tan(', type: 'scientific' },
      { label: 'π', type: 'scientific' },
    ],
    [
      { label: 'log(', type: 'scientific' },
      { label: 'ln(', type: 'scientific' },
      { label: 'e', type: 'scientific' },
      { label: '÷', type: 'operator' },
    ],
    [
      { label: '7', type: 'number' },
      { label: '8', type: 'number' },
      { label: '9', type: 'number' },
      { label: '×', type: 'operator' },
    ],
    [
      { label: '4', type: 'number' },
      { label: '5', type: 'number' },
      { label: '6', type: 'number' },
      { label: '-', type: 'operator' },
    ],
    [
      { label: '1', type: 'number' },
      { label: '2', type: 'number' },
      { label: '3', type: 'number' },
      { label: '+', type: 'operator' },
    ],
    [
      { label: '±', type: 'function' },
      { label: '0', type: 'number', width: 2 },
      { label: '.', type: 'number' },
      { label: '=', type: 'equals' },
    ],
  ];

  return (
    <View style={styles.container}>
      <Display expression={expression} result={result} history={history} />
      <ScrollView style={styles.buttonContainer} showsVerticalScrollIndicator={false}>
        {buttonRows.map((row, index) => renderRow(row))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

export default ScientificCalculator;
