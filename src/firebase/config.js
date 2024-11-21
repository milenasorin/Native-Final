import app from 'firebase/app';
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAkN-0C87BYZxiQq4x4cqRbOfiZHKo2mqk",
  authDomain: "mileproyectoo.firebaseapp.com",
  projectId: "mileproyectoo",
  storageBucket: "mileproyectoo.appspot.com",
  messagingSenderId: "884021421055",
  appId: "1:884021421055:web:9fb7d1989d9b12f2253dca"
};
  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
  