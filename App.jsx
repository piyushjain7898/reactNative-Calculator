import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const buttons = [
  'C', '%', '⌫', '÷',
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '00', '0', '.', '=',
];

const App = () => {
  const [input, setInput] = useState('');
  const [expression, setExpression] = useState('');

  const handlePress = value => {
    if (value === 'C') {
      setInput('');
      setExpression('');
      return;
    }

    if (value === '⌫') {
      setInput(input.slice(0, -1));
      return;
    }

    if (value === '=') {
      try {
        const result = eval(
          input.replace(/×/g, '*').replace(/÷/g, '/')
        );
        setExpression(input);
        setInput(result.toString());
      } catch {
        setInput('Error');
      }
      return;
    }

    setInput(input + value);
  };

  const renderItem = ({ item }) => {
    const isOperator =
      isNaN(item) && item !== '.' && item !== '00';

    const isEqual = item === '=';

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isEqual
              ? '#E53935' // RED background
              : isOperator
              ? '#4d4d4d' // operator gray
              : '#2e2e2e', // number dark gray
          },
        ]}
        onPress={() => handlePress(item)}>
        <Text style={styles.buttonText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* DISPLAY */}
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.input}>{input || '0'}</Text>
      </View>

      {/* BUTTONS AT BOTTOM */}
      <View style={styles.buttonContainer}>
        <FlatList
          data={buttons}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  expression: {
    color: '#888',
    fontSize: 20,
  },

  input: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },

  buttonContainer: {
    paddingBottom: 10, // keeps buttons at bottom
  },

  button: {
    flex: 1,
    height: 75,
    margin: 6,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});
