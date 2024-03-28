import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, Polyline } from 'react-native-maps';
import polyline from '@mapbox/polyline'; // Ensure this package is installed

const apikey = '';

const RequestRideScreen = ({ navigation }) => {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');


const calculateFare = (distance, duration) => {
  const distanceInKm = parseFloat(distance);
  const baseFare = 2;
  const ratePerKm = 0.5;
  const fare = baseFare + (distanceInKm * ratePerKm);
  return fare.toFixed(2); 
};


  useEffect(() => {
    if (pickup && dropoff) {
      fetchDirections(pickup.details.geometry.location, dropoff.details.geometry.location);
      fetchDistanceAndTime(pickup.details.geometry.location, dropoff.details.geometry.location);
    }
  }, [pickup, dropoff]);

  const fetchDirections = async (startLoc, destinationLoc) => {
    const start = `${startLoc.lat},${startLoc.lng}`;
    const destination = `${destinationLoc.lat},${destinationLoc.lng}`;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${destination}&key=${apikey}&mode=driving`
      );
      const json = await response.json();
      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const route = points.map(point => ({ latitude: point[0], longitude: point[1] }));
      setRoute(route);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDistanceAndTime = async (startLoc, destinationLoc) => {
    const origins = `${startLoc.lat},${startLoc.lng}`;
    const destinations = `${destinationLoc.lat},${destinationLoc.lng}`;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apikey}&mode=driving`
      );
      const json = await response.json();
      const distanceInfo = json.rows[0].elements[0];
      setDistance(distanceInfo.distance.text);
      setDuration(distanceInfo.duration.text);
    } catch (error) {
      console.error('Fetch Distance and Time Error:', error);
    }
  };


  const getMapRegion = () => {
    let lat = 37.78825;
    let lng = -122.4324;

    if (pickup && pickup.details && pickup.details.geometry) {
      lat = pickup.details.geometry.location.lat;
      lng = pickup.details.geometry.location.lng;
    }

    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  const handleSetDestinationPress = async () => {
    if (!pickup || !dropoff) {
      Alert.alert("Error", "Please select both pickup and dropoff locations.");
      return;
    }

    // Prepare the data for the POST request
    const data = {
      pickup_latitude: pickup.details.geometry.location.lat,
      pickup_longitude: pickup.details.geometry.location.lng,
      dropoff_latitude: dropoff.details.geometry.location.lat,
      dropoff_longitude: dropoff.details.geometry.location.lng,
      fare: calculateFare(distance, duration), // Implement this function based on your fare calculation logic
    };

    try {
      const response = await fetch('http://localhost:2014/ride-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('userToken')}`, // Replace 'userToken' with your actual token key
        },
        body: JSON.stringify(data),
      });

      const jsonResponse = await response.json();
      if (response.status === 201) {
        Alert.alert("Success", "Ride requested successfully");
      } else {
        Alert.alert("Error", jsonResponse.message || "An error occurred while requesting the ride.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "An error occurred while requesting the ride.");
    }
  };


  return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      region={getMapRegion()}
      showsUserLocation={true}
    >
      {pickup && (
        <Marker
          coordinate={{
            latitude: pickup.details.geometry.location.lat,
            longitude: pickup.details.geometry.location.lng,
          }}
          title="Pickup Location"
        />
      )}
      {dropoff && (
        <Marker
          coordinate={{
            latitude: dropoff.details.geometry.location.lat,
            longitude: dropoff.details.geometry.location.lng,
          }}
          title="Dropoff Location"
        />
      )}
      {route.length > 0 && (
        <Polyline
          coordinates={route}
          strokeWidth={4}
          strokeColor="#1a66ff"
        />
      )}
    </MapView>

      <View style={styles.searchBarContainer}>
        <GooglePlacesAutocomplete
          placeholder="From"
          onPress={(data, details = null) => {
            setPickup({ data, details });
          }}
          query={{
            key: apikey,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.searchBar,
          }}
          onFail={error => console.error(error)}
        />
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDropoff({ data, details });
          }}
          query={{
            key: apikey,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.searchBar,
          }}
          onFail={error => console.error(error)}
          
        />  
         {distance && duration && (
        <View style={styles.infoContainer}>
          <Text>Distance: {distance}</Text>
          <Text>Estimated Time: {duration}</Text>
        </View>
      )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSetDestinationPress}
      >
        <Text style={styles.buttonText}>Set Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 5,
  },
  searchBar: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    margin: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default RequestRideScreen;
