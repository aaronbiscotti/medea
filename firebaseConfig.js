// firebase/initFirebase.js
import { initializeApp, getApps } from 'firebase/app';

const clientCredentials = {
    apiKey: "AIzaSyCtd-fTecxT4KGjI-3hQ79fbAEy-sGdfm0",
    authDomain: "medea-7ef09.firebaseapp.com",
    projectId: "medea-7ef09",
    storageBucket: "medea-7ef09.appspot.com",
    messagingSenderId: "200117037823",
    appId: "1:200117037823:web:7579feffdc61ed53c2baca",
    measurementId: "G-3539M05PFZ",
};

export default function initFirebase() {
    if (typeof window !== "undefined" && getApps().length === 0) {
        initializeApp(clientCredentials);
        console.log("Firebase has been initialized successfully");
    }
}
