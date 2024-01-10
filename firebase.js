import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebase = initializeApp(firebaseConfig);
const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const firestore = getFirestore();

export { firebase, auth, firestore };

