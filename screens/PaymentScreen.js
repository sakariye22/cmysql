// screens/PaymentScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headingText}>Payment Screen</Text>
      {/* You can add your payment options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your preferred background color
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // ... add more styles if needed
});

export default PaymentScreen;
