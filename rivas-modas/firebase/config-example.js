import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  projectId: 'your-project-id-1234',
  appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
  databaseURL: 'https://your-database-name.firebaseio.com',
  storageBucket: 'your-project-id-1234.appspot.com',
  apiKey: 'YOUR_KEY_HERE_AIzaSyAOWH',
  authDomain: "your-auth-domain-b1234.firebaseapp.com",
  messagingSenderId: '12345-insert-yourse',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };