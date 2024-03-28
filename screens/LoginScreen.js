import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.93:3010/login/user', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.navigate('Home');
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize='none' style={styles.input} />
      <TextInput placeholder="Password" value={password} autoCapitalize='none' secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Log in" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginScreen;
