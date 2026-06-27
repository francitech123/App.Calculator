// src/components/Display.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Display = ({ expression, result, history }) => {
  return (
    <View style={styles.container}>
      <View style={styles.displayWrapper}>
        {history ? <Text style={styles.history}>{history}</Text> : null}
        <Text style={styles.expression} numberOfLines={1} adjustsFontSizeToFit>
          {expression || '0'}
        </Text>
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
          {result}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#1C1C1E',
    minHeight: 150,
  },
  displayWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  history: {
    color: '#8E8E93',
    fontSize: 16,
    marginBottom: 4,
  },
  expression: {
    color: '#AEAEB2',
    fontSize: 32,
    marginBottom: 4,
  },
  result: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: 'bold',
  },
});

export default Display;
