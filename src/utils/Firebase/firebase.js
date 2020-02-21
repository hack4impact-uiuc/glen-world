import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
// import Firebase from 'util/Firebase/firebase.js';

// Firebase.getLesson = () =>
//     Firebase.db.collection('custom_lesson');

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.functions = app.functions();

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }
  //Data access APIs
  customLessons = (adminAccountId) => this.db.collection(`custom_lesson`).where('adminAccountId', '==', adminAccountId);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // EXAMPLE ENDPOINT
  getLesson = () => this.db.collection("custom_lesson");
}

export default Firebase;
