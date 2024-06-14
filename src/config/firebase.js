// src/config/firebase.js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCpvnjZPQGCnTC__rqCpqcSLliO2eKnvc4",
	authDomain: "fir-yourwoof.firebaseapp.com",
	projectId: "fir-yourwoof",
	storageBucket: "fir-yourwoof.appspot.com",
	messagingSenderId: "327622369580",
	appId: "1:327622369580:web:a47ae27da14d1d93180c89",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
const PhoneAuthProvider = firebase.auth.PhoneAuthProvider;

export {
	firestore,
	auth,
	storage,
	database,
	timestamp,
	RecaptchaVerifier,
	PhoneAuthProvider,
	firebase,
};