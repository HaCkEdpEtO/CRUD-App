import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: 'AIzaSyApFuPBNYlYP5_paGv5JxJ-wvmXFow9XIU',
    authDomain: 'quanti-656d1.firebaseapp.com',
    databaseURL: 'https://quanti-656d1-default-rtdb.firebaseio.com',
    projectId: 'quanti-656d1',
    storageBucket: 'quanti-656d1.appspot.com',
    messagingSenderId: '745198499326',
    appId: '1:745198499326:web:c44827c0965b0260853caf'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;