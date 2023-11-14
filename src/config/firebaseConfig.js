import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBa2a3R0lxjUrUPZCzpHLGw8QDC_0XTSZE",
  authDomain: "apptask2-4fda7.firebaseapp.com",
  projectId: "apptask2-4fda7",
  storageBucket: "apptask2-4fda7.appspot.com",
  messagingSenderId: "150288736440",
  appId: "1:150288736440:web:8a4d6a1131d75ec116d44d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {database, auth};
