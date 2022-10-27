import  firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF-meFZ0tEUSxAoRYIF0j4rcJXkhiBvno",
  authDomain: "signal-clone-cb3d3.firebaseapp.com",
  projectId: "signal-clone-cb3d3",
  storageBucket: "signal-clone-cb3d3.appspot.com",
  messagingSenderId: "673095623602",
  appId: "1:673095623602:web:cdef6fc964e8d42f483aab",
};


if (firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
} 


export { firebase };
