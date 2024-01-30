import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCxLqeE2xw9aL2frnlgdiRoExgsvzGHuHM",
    authDomain: "todolist-97501.firebaseapp.com",
    projectId: "todolist-97501",
    storageBucket: "todolist-97501.appspot.com",
    messagingSenderId: "165405392503",
    appId: "1:165405392503:web:c8cf1de65a271d9f00d072",
    databaseURL: "https://todolist-97501-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export default firebase;
export const database = getDatabase(app);
