// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA34Njd-B7gIMTpmwp0IhIJ3Bxp6rsdMSA",
  authDomain: "smart-home-nhat-minh.firebaseapp.com",
  projectId: "smart-home-nhat-minh",
  storageBucket: "smart-home-nhat-minh.firebasestorage.app",
  messagingSenderId: "591416152502",
  appId: "1:591416152502:web:9fe534588d20ccac63b117"
};
const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);

export default app;