// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  // database
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp ,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyBR7Ix7nAeq03f_PmzcJ_SFcfAUqy81_QM",
  authDomain: "my-first-project-7a77c.firebaseapp.com",
  projectId: "my-first-project-7a77c",
  storageBucket: "my-first-project-7a77c.firebasestorage.app",
  messagingSenderId: "176822663830",
  appId: "1:176822663830:web:fe14231950b6d8ec77e0b7",
  measurementId: "G-1D50SFQV9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  const auth = getAuth(app);
const db = getFirestore(app);

export {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
};

export { addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc, db,serverTimestamp  };
