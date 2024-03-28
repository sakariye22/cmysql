import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

const AboutScreen = () => {
  return (
    <ImageBackground 
      source={{ uri: 'https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340' }} 
      style={styles.container}
      resizeMode="cover" // "cover" or "contain" based on your design need
    >
      <Text style={styles.header}>Welcome to City Cab</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>🚕 Fast & Reliable Rides</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>🌍 Serving Your City & Beyond</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>💳 Easy Payment with App</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>👥 Friendly, Professional Drivers</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>📱 24/7 Customer Support</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  box: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
});

export default AboutScreen;
