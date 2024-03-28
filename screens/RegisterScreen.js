import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3010/register/user', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone_number: phoneNumber, payment_method: paymentMethod }),
      });
      const data = await response.json();
      if (response.status === 201) {
        alert(data.message); 
      } else {
        alert('Registration Failed'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} autoCapitalize="none"  style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none"  style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} autoCapitalize="none"  secureTextEntry style={styles.input} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad"  autoCapitalize="none"  style={styles.input} />
      <TextInput placeholder="Payment Method" value={paymentMethod} onChangeText={setPaymentMethod} autoCapitalize="none"  style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white', 
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF', 
  },
});

export default RegisterScreen;
