
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../avatar.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Saki</Text>
        <Text style={styles.profileLink}>View profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
    backgroundColor: '#cccccc', 
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileLink: {
    color: '#007bff', 
    marginBottom: 20,
  },
});

export default ProfileScreen;
