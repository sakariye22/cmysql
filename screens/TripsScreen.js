import React from 'react';
import { Text, View, StyleSheet, ScrollView,ImageBackground } from 'react-native';

const userTripsData = [
  { date: '2024-01-15', from: 'Central Park', to: 'Times Square', cost: '$15' },
  { date: '2024-02-20', from: 'Grand Central', to: 'Wall Street', cost: '$22' },
  { date: '2024-03-05', from: 'Empire State', to: 'Statue of Liberty', cost: '$30' },
  { date: '2024-04-10', from: 'Brooklyn Bridge', to: 'Central Park', cost: '$25' },
  { date: '2024-05-08', from: 'Times Square', to: 'Central Park', cost: '$18' },
  { date: '2024-06-15', from: 'Wall Street', to: 'Empire State', cost: '$28' },
  { date: '2024-07-20', from: 'Statue of Liberty', to: 'Grand Central', cost: '$35' },
  { date: '2024-08-05', from: 'Central Park', to: 'Wall Street', cost: '$20' },
  { date: '2024-09-10', from: 'Empire State', to: 'Times Square', cost: '$27' },
  { date: '2024-10-15', from: 'Wall Street', to: 'Brooklyn Bridge', cost: '$23' },
  { date: '2024-11-20', from: 'Grand Central', to: 'Statue of Liberty', cost: '$40' },
  { date: '2024-12-05', from: 'Central Park', to: 'Empire State', cost: '$24' },
  { date: '2025-01-15', from: 'Times Square', to: 'Wall Street', cost: '$21' },
  { date: '2025-02-20', from: 'Statue of Liberty', to: 'Central Park', cost: '$32' },
  { date: '2025-03-05', from: 'Brooklyn Bridge', to: 'Grand Central', cost: '$29' },
  { date: '2025-04-10', from: 'Empire State', to: 'Wall Street', cost: '$26' },
  { date: '2025-05-08', from: 'Central Park', to: 'Times Square', cost: '$19' },
];

const TripsScreen = () => {
  return (
    <ImageBackground 
      source={{ uri: 'https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340' }} 
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Recent Trips</Text>
        {userTripsData.map((trip, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.boxTitle}>Date: {trip.date}</Text>
            <Text style={styles.boxText}>From: {trip.from}</Text>
            <Text style={styles.boxText}>To: {trip.to}</Text>
            <Text style={styles.boxText}>Cost: {trip.cost}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1, // Ensure full screen coverage
  },
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Changed to white for better visibility against possible dark background images
    marginBottom: 20,
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white for readability
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4F4F4F',
  },
  boxText: {
    fontSize: 16,
    color: '#4F4F4F',
  },
});

export default TripsScreen;
