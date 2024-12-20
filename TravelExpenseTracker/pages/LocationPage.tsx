import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LocationPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Location Page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
