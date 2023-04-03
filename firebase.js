// Importa a biblioteca do Firebase
import firebase from "firebase/app"
import 'firebase/compat/storage';
// Define a configuração do Firebase
const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao armazenamento do Firebase
const storageRef = firebase.storage().ref();

export { storageRef };