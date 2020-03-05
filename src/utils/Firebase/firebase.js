import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

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

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  getLastMasteredLesson = deploymentAccountId =>
    this.db
      .doc(`deployment_account/${deploymentAccountId}/`)
      .get()
      .then(deploymentDoc => {
        const lastMasteredLesson = deploymentDoc.get("profile.glenLearn.lastMasteredLesson");
        return new Promise((resolve, reject) => {
          if (deploymentDoc) {
            resolve(lastMasteredLesson);
          } else {
            reject(Error("Deployment doc does not exist"));
          }
        });
      })
      .catch(error => console.log("Error getting student account: ", error));

  getTeacherCustomLessons = adminAccountId =>
    this.db
      .collection(`custom_lesson`)
      .where("adminAccountId", "==", adminAccountId)
      .get()
      .then(querySnapshot => {
        const customLessons = querySnapshot.docs.map(doc => doc.data());
        return new Promise((resolve, reject) => {
          if (querySnapshot) {
            resolve(customLessons);
          } else {
            reject(Error("No custom lessons found."));
          }
        });
      })
      .catch(error => console.log("Error getting custom lessons: ", error));

  getStudentCustomLessons = deploymentAccountId =>
    this.db
      .doc(`deployments/${deploymentAccountId}/`)
      .get()
      .then(deploymentDoc => {
        const customLessonIds = deploymentDoc.get("customLessons");
        const customLessonRefs = customLessonIds.map(id =>
          this.db.doc(`custom_lesson/${id}`).get()
        );

        return Promise.all(customLessonRefs)
          .then(customLessonDocs => {
            const customLessons = customLessonDocs.map(doc => doc.data());
            return customLessons;
          })
          .catch(error => console.log("Error getting all custom lessons: ", error));
      })
      .catch(error => console.log("Error getting student account: ", error));

  getStudentSummaries = adminAccountId =>
    this.db
      .doc(`admin_account/${adminAccountId}/`)
      .get()
      .then(adminDoc => {
        const deploymentIds = Object.keys(adminDoc.get("deployments"));
        const deploymentRefs = deploymentIds.map(id => this.db.doc(`deployments/${id}`).get());

        return Promise.all(deploymentRefs)
          .then(deploymentDocs => {
            const studentSummaries = deploymentDocs.map(doc => doc.data());
            return studentSummaries;
          })
          .catch(error => console.log("Error getting all deployments: ", error));
      })
      .catch(error => console.log("Error getting admin account: ", error));
}

export default Firebase;
