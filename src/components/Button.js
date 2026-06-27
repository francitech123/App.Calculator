// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = (width - 20) / 4;

const Button = ({ label, onPress, type = 'number', width = 1, isDark = true }) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'operator':
        return styles.operatorButton;
      case 'function':
        return styles.functionButton;
      case 'equals':
        return styles.equalsButton;
      case 'clear':
        return styles.clearButton;
      case 'scientific':
        return styles.scientificButton;
      default:
        return styles.numberButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'operator':
      case 'equals':
        return styles.operatorText;
      case 'clear':
        return styles.clearText;
      default:
        return styles.numberText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        { 
          width: (buttonSize - 4) * width + 4 * (width - 1),
          height: buttonSize - 4,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, getTextStyle()]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 2,
    borderRadius: buttonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  numberButton: {
    backgroundColor: '#4a4a4a',
  },
  operatorButton: {
    backgroundColor: '#FF9F0A',
  },
  functionButton: {
    backgroundColor: '#3a3a3a',
  },
  scientificButton: {
    backgroundColor: '#2a2a2a',
  },
  equalsButton: {
    backgroundColor: '#FF9F0A',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  operatorText: {
    color: '#FFFFFF',
  },
  clearText: {
    color: '#FFFFFF',
  },
  numberText: {
    color: '#FFFFFF',
  },
});

export default Button;
