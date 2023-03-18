import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Firebase from 'Firebase/app';
import 'Firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtd-fTecxT4KGjI-3hQ79fbAEy-sGdfm0",
    authDomain: "medea-7ef09.firebaseapp.com",
    projectId: "medea-7ef09",
    storageBucket: "medea-7ef09.appspot.com",
    messagingSenderId: "200117037823",
    appId: "1:200117037823:web:7579feffdc61ed53c2baca",
    measurementId: "G-3539M05PFZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);