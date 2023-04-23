import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyAuIJu7BeYxybQXZw6IjceFVvnVtd1kXuU",
    authDomain: "react-ata.firebaseapp.com",
    projectId: "react-ata",
    storageBucket: "react-ata.appspot.com",
    messagingSenderId: "455574574289",
    appId: "1:455574574289:web:fd06128b2affafa8d0a1f0",
    measurementId: "G-LJ0FEWNTFY"
});

export default firebaseConfig;