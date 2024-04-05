import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'kminchelle',
          password: '0lelplR',
          expiresInMins: 30
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid credentials', 'Please check your username and password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
       <Text style={styles.login}>Log</Text>
       <Text style={styles.login}>in</Text>
      </View>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems:'center'
  },
  title: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 50,
  },
  login:{
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  logo: {
    marginBottom: 50,
  },
  input: {
    width:'100%',
    marginBottom: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
  },
  button: {
    width:'100%',
    backgroundColor: '#7867BE',
    borderRadius: 10,
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
