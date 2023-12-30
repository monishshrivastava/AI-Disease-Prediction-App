import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGoALBjgXg6UM2rBd9JBrfuQFTcdKK6JU",
  authDomain: "docbot-4124c.firebaseapp.com",
  projectId: "docbot-4124c",
  storageBucket: "docbot-4124c.appspot.com",
  messagingSenderId: "430300054939",
  appId: "1:430300054939:web:261b24ba86b9b03b8f4d3e"
};

const firebase = initializeApp(firebaseConfig);
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore();

export { firebase, auth, firestore };

