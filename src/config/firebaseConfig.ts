import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


export const firebaseConfig = {
  apiKey: "AIzaSyCwAnL8cjbyETStkxSapWS5kybpl4L1Mkg",
  authDomain: "plannera-d5be3.firebaseapp.com",
  projectId: "plannera-d5be3",
  storageBucket: "plannera-d5be3.appspot.com",
  messagingSenderId: "1050992097678",
  appId: "1:1050992097678:web:000e9ea97d01535e008cdf"
  
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, app };

