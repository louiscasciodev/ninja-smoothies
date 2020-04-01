import firebase from 'firebase';
// import firestore from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD5ipduT3fG1fZlxkNTu8lq06UwnybkJXw',
  authDomain: 'ninja-smoothies-5d9db.firebaseapp.com',
  databaseURL: 'https://ninja-smoothies-5d9db.firebaseio.com',
  projectId: 'ninja-smoothies-5d9db',
  storageBucket: 'ninja-smoothies-5d9db.appspot.com',
  messagingSenderId: '383226476125',
  appId: '1:383226476125:web:0f5831ace5e48017e0ffb4',
};
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
