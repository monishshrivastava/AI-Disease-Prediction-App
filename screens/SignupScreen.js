import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,ActivityIndicator  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

function SignupScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();

  const navigation = useNavigation();

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleSignup = async () => {
    setNameError('');
    setEmailError('');
    setContactError('');
    setPasswordError('');
  
    if (!name) {
      setNameError('Please enter your name');
      return;
    }
  
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
  
    if (!contact) {
      setContactError('Please enter your contact number');
      return;
    }
  
    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
     await saveDataToFirestore();
  
      console.log('User signed up successfully');
    } catch (error) {
      Alert.alert('Error signing up:', String(error.message));
    } finally {
      setLoading(false);
    }
  };
  

  const saveDataToFirestore = async () => {
    console.log('Saving data to Firestore:', name, email, contact);
    try {
      const usersCollection = collection(firestore, 'users');
      await addDoc(usersCollection, { 
        name,
        email,
        contact,
      });
      console.log('Data saved to Firestore');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error saving data to Firestore:', error.message);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DOCBOT</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
          keyboardType="default"
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>
  
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>
  
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Contact"
          placeholderTextColor="#003f5c"
          onChangeText={(number) => setContact(number)}
          keyboardType="numeric"
        />
        {contactError ? <Text style={styles.errorText}>{contactError}</Text> : null}
      </View>
  
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
          keyboardType="default"
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
  
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>SIGNUP</Text>
        )}
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#F57D11',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'grey',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#F57D11',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: 'orange',
    fontSize: 8,
  }, 
});

export default SignupScreen;
