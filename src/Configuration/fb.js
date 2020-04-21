import * as firebase from 'firebase';
import "firebase/firestore";


    firebase.initializeApp({
        apiKey: "AIzaSyDLDusUD3Q2DAyTuPxdIuZYo0Yn3fG5E-s",
        authDomain: "snakeoverkill.firebaseapp.com",
        databaseURL: "https://snakeoverkill.firebaseio.com",
        projectId: "snakeoverkill",
        storageBucket: "snakeoverkill.appspot.com",
        messagingSenderId: "5881529359",
        appId: "1:5881529359:web:6251c99f2229a158788f7a"
    });

export const db = firebase.firestore();


