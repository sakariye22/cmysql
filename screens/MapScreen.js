import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MapScreen = () => {
  const [region, setRegion] = useState(null);

  const updateLocation = async (latitude, longitude) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Token not available');

      await axios.post('http://192.168.1.93:2014/user-location', { latitude, longitude }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
         console.log('updated');
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update location.");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Cannot access location data.');
        return;
      }

      const updateLocationInterval = setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        const userRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(userRegion);
        updateLocation(userRegion.latitude, userRegion.longitude);
      }, 6000); 

      return () => clearInterval(updateLocationInterval); 
    })();
  }, []);

  return region ? (
    <MapView
      style={styles.map}
      initialRegion={region}
    >
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title="Your Location"
        description="You are here"
      />
    </MapView>
  ) : null;
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
