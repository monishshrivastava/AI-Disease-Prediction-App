import React, { useState, useEffect } from "react";
import { ScrollView, View, StatusBar, Text, TouchableOpacity } from "react-native";
import { auth } from '../../firebase';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const firestore = getFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(firestore, 'users'), where('email', '==', user.email));
          const userSnapshot = await getDocs(q);

          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            setUserEmail(userData.email || 'Default Email')
            setUserName(userData.name || 'Default Name');
          } else {
            console.warn('User data not found in Firestore');
          }
        } else {
          console.warn('No authenticated user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar
        backgroundColor="#F57D11"
        barStyle="light-content"
      />

      <View
        style={{
          height: 100,
          backgroundColor: '#F57D11',
          borderBottomLeftRadius: 70,
          borderBottomRightRadius: 70,
          padding: 20,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
            {userName ? `Welcome, ${userName}` : 'Welcomes User'}
          </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        <Text style={{ color: 'white', padding: 5 }}>
        Are You Suffering??
        </Text>
        <Text style={{ color: 'white', padding: 5 }}>
        Click on the below button 
        </Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('DiseasePrediction')}
          style={{
            marginTop: 20,
            marginLeft: 40,
            marginRight: 40,
            padding: 20,
            borderWidth: 1,       
            borderColor: 'white',  
            borderRadius: 10 

          }}
        >
          <Text style={{ color: 'white', textAlign: "center" }}>Click Here</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default Dashboard;
