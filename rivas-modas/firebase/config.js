import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  "projectId": "rivas-modas",
  "appId": "1:624287700709:web:786b2f2479295c2cade60c",
  "databaseURL": "https://rivas-modas-default-rtdb.firebaseio.com",
  "storageBucket": "rivas-modas.appspot.com",
  "apiKey": "AIzaSyD5tDIwBiQgiaBivkXIvItfNakgJxvdHbA",
  "authDomain": "rivas-modas.firebaseapp.com",
  "messagingSenderId": "624287700709",
  "measurementId": "G-02W0N33G8E"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };