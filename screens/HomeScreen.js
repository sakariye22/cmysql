import React, { useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ScrollView ,Image,TextInput} from 'react-native';
import TripsScreen from './TripsScreen';
import AboutScreen from './AboutScreen';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen.js';
import { Dimensions } from 'react-native';

const drawerWidth = 250; 



const PaymentScreen = () => (
  <View style={styles.placeholderScreen}>
    <Text>Payment Screen</Text>
  </View>
);

const DrawerContent = ({ navigation }) => {
  return (
    <ScrollView style={{ width: drawerWidth }}>
      <View style={styles.profileHeader}>
        <Image
          style={styles.profilePic}
          source={require('../avatar.png')} 
        />
        <Text style={styles.profileName}>Zakariye</Text>
        <TouchableOpacity onPress={() => navigation.push('Profile')}>
          <Text style={styles.viewProfileText}>View profile</Text>
        </TouchableOpacity>
      </View> 
      <TouchableOpacity onPress={() => navigation.push('Trips')}>
        <Text style={styles.drawerItem}>Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('About')}>
        <Text style={styles.drawerItem}>About</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRequestingRide, setIsRequestingRide] = useState(false);
  const drawerPosition = useRef(new Animated.Value(-drawerWidth)).current;
  const { height, width } = Dimensions.get('window');
  

  const toggleDrawer = () => {
    const toValue = drawerOpen ? -drawerWidth : 0;

    Animated.timing(drawerPosition, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setDrawerOpen(!drawerOpen);
  };

  const onSearchBarFocus = () => {
    navigation.navigate('RequestRide');
  };
  const onSearchBarBlur = () => {
    setIsRequestingRide(false);
  };

  if (isRequestingRide) {
    return <RequestRideScreen navigation={navigation} />;
  };




  return (
    <View style={{ flex: 1 }}>
      {drawerOpen && (
        <TouchableOpacity
          style={[styles.overlay, { width: width - drawerWidth, height: height }]}
          onPress={toggleDrawer}
        />
      )}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerPosition }],
          },
        ]}
      >
        <DrawerContent navigation={navigation} />
      </Animated.View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
          <Text>{drawerOpen ? 'Close' : 'Menu'}</Text>
        </TouchableOpacity>
        <MapScreen />
        <TextInput
          style={styles.searchBar}
          placeholder="Where to?"
          onFocus={onSearchBarFocus}
          onBlur={onSearchBarBlur}
        />
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, 
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: drawerWidth,
    backgroundColor: 'white',
    zIndex: 1000, 
  },
  menuButton: {
    position: 'absolute',
    top: 40, 
    left: 10,
    zIndex: 1001, 
  },
  drawerItem: {
    padding: 16,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeholderScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f2f2f2', 
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40, 
    borderWidth: 3,
    borderColor: '#ffffff', 
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  viewProfileText: {
    color: '#0000ff',
    marginTop: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject, 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: drawerWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999, 
  },
  searchBar: {
    position: 'absolute',
    bottom: 30, 
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingLeft: 20,
    fontSize: 18,
    elevation: 3, // for Android
    shadowColor: '#000', // for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default HomeScreen;