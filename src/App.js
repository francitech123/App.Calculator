// src/App.js
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View, StatusBar } from 'react-native';
import StandardCalculator from './screens/StandardCalculator';
import ScientificCalculator from './screens/ScientificCalculator';

const App = () => {
  const [isScientific, setIsScientific] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1E" />
      
      <View style={styles.header}>
        <Text style={styles.title}>
          {isScientific ? '🔬 Scientific' : '📱 Standard'}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Standard</Text>
          <Switch
            value={isScientific}
            onValueChange={setIsScientific}
            trackColor={{ false: '#636366', true: '#FF9F0A' }}
            thumbColor={isScientific ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#636366"
          />
          <Text style={styles.switchLabel}>Scientific</Text>
        </View>
      </View>
      
      {isScientific ? <ScientificCalculator /> : <StandardCalculator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2C2C2E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#8E8E93',
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 6,
  },
});

export default App;
