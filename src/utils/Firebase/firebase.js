import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { getDeploymentAccountIdsFromLesson } from "utils/Lesson";
import { FIREBASE_DB } from "../constants";

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

  // Gets the most recent lesson that a student has completed
  getLastMasteredLesson = deploymentAccountId =>
    this.db
      .doc(`${FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL}/${deploymentAccountId}/`)
      .get()
      .then(deploymentAccountDoc => {
        const lastMasteredLesson = deploymentAccountDoc.get(
          "profile.glenLearn.lastMasteredLesson"
        );
        return new Promise((resolve, reject) => {
          if (deploymentAccountDoc) {
            resolve(lastMasteredLesson);
          } else {
            reject(Error("Deployment doc does not exist"));
          }
        });
      })
      .catch(error => console.error("Error getting student account: ", error));

  // Gets custom lessons made by admin
  getAdminCustomLessons = adminAccountId =>
    this.db
      .collection(FIREBASE_DB.CUSTOM_LESSONS_COL)
      .where("adminAccountId", "==", adminAccountId)
      .get()
      .then(lessonQuerySnapshot => {
        const customLessons = lessonQuerySnapshot.docs.map(doc => {
          let docData = doc.data();
          let lessonDoc = {
            id: doc.id,
            ...docData
          };

          return lessonDoc;
        });
        return new Promise((resolve, reject) => {
          if (lessonQuerySnapshot) {
            resolve(customLessons);
          } else {
            reject(Error("No custom lessons found."));
          }
        });
      })
      .catch(error => console.error("Error getting custom lessons: ", error));

  getDeploymentAccountInformation = deploymentAccountId =>
    this.db
      .doc(`${FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL}/${deploymentAccountId}/`)
      .get()
      .then(deploymentAccountDoc => {
        const deploymentAccountData = deploymentAccountDoc.data();

        return new Promise((resolve, reject) => {
          if (deploymentAccountDoc) {
            resolve(deploymentAccountData);
          } else {
            reject(Error("No deployment account found."));
          }
        });
      })
      .catch(error => console.error("Error getting student account: ", error));

  // Get student's assigned custom lessons
  getDeploymentAccountCustomLessons = deploymentAccountId =>
    this.db
      .doc(`${FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL}/${deploymentAccountId}/`)
      .get()
      .then(deploymentAccountDoc => {
        const customLessonsField = deploymentAccountDoc.get(
          FIREBASE_DB.CUSTOM_LESSONS_FIELD
        );
        const customLessonRefs = Object.keys(customLessonsField).map(id =>
          this.db.doc(`${FIREBASE_DB.CUSTOM_LESSONS_COL}/${id}`).get()
        );

        return Promise.all(customLessonRefs)
          .then(customLessonDocs => {
            let customLessons = customLessonDocs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              };
            });
            let assignments = [];

            // Get due dates for assignments
            customLessons.forEach(customLesson => {
              for (let [dueDate, assignedDeploymentIds] of Object.entries(
                customLesson.dueDates
              )) {
                if (assignedDeploymentIds.includes(deploymentAccountId)) {
                  // Making deep copy of lesson
                  let lessonCopy = JSON.parse(JSON.stringify(customLesson));
                  delete lessonCopy.dueDates;
                  lessonCopy.dueDate = dueDate;
                  lessonCopy.isCompleted = deploymentAccountDoc.get(
                    FIREBASE_DB.CUSTOM_LESSONS_FIELD
                  )[lessonCopy.id][dueDate];
                  assignments.push(lessonCopy);
                }
              }
            });

            return assignments;
          })
          .catch(error =>
            console.error("Error getting all custom lessons: ", error)
          );
      })
      .catch(error => console.error("Error getting student account: ", error));

  // Get students of admin
  getDeploymentAccountsFromAdmin = adminAccountId =>
    this.db
      .doc(`${FIREBASE_DB.ADMIN_ACCOUNT_COL}/${adminAccountId}/`)
      .get()
      .then(adminDoc => {
        const deploymentIds = Object.keys(adminDoc.get("deployments"));
        const deploymentRefs = deploymentIds.map(id =>
          this.db
            .collection(FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL)
            .where("deploymentId", "==", id)
        );

        return Promise.all(deploymentRefs)
          .then(deploymentQuery => {
            let deployments = [];
            for (var i = 0; i < deploymentIds.length; i++) {
              let deployment = {
                deploymentId: deploymentIds[i],
                deploymentAccounts: {}
              };

              // Getting deployment accounts from deploymentId query
              deploymentQuery[i]
                .get()
                .then(querySnapshot => {
                  let deploymentDocs = querySnapshot.docs;
                  for (let deploymentDoc of deploymentDocs) {
                    deployment.deploymentAccounts[
                      deploymentDoc.id
                    ] = deploymentDoc.data();
                  }
                })
                .catch(error =>
                  console.error("Error gettng all deployments: ", error)
                );

              deployments.push(deployment);
            }
            return deployments;
          })
          .catch(error =>
            console.error("Error getting all deployment refs: ", error)
          );
      })
      .catch(error => console.error("Error getting admin account: ", error));

  deleteCustomLesson = (lessonId, dueDates) => {
    this.db
      .collection(FIREBASE_DB.CUSTOM_LESSONS_COL)
      .doc(lessonId)
      .delete()
      .catch(error => console.error("Error deleting doc: ", error));

    let deploymentAccountIds = getDeploymentAccountIdsFromLesson({
      dueDates: dueDates
    });
    deploymentAccountIds.forEach(deploymentAccountId => {
      this.db
        .collection(FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL)
        .doc(deploymentAccountId)
        .update({
          [`${FIREBASE_DB.CUSTOM_LESSONS_FIELD}.${lessonId}`]: app.firestore.FieldValue.delete()
        });
    });
  };

  setCustomLesson = (
    adminAccountId,
    lessonTemplate,
    wordGroup,
    words,
    dueDates,
    lessonName,
    lessonDocId = null
  ) => {
    // Push specific custom lesson to admin account
    let customLessonRef = this.db.collection(FIREBASE_DB.CUSTOM_LESSONS_COL);

    // Get existing lesson to edit or create new lesson
    if (lessonDocId) customLessonRef = customLessonRef.doc(lessonDocId);
    else customLessonRef = customLessonRef.doc();

    // TODO: needs error validation to stop function if customLesson fails
    return customLessonRef.get().then(customLessonDoc => {
      // Get existing lesson's currently assigned students
      let currentAssignedDeploymentIds = [];
      if (lessonDocId) {
        currentAssignedDeploymentIds = getDeploymentAccountIdsFromLesson(
          customLessonDoc.data()
        );
      }
      // Get new lesson's assigned students
      let deploymentAccountIds = new Set();
      for (let assignedDeploymentIds of Object.values(dueDates)) {
        assignedDeploymentIds.forEach(deploymentId =>
          deploymentAccountIds.add(deploymentId)
        );
      }
      deploymentAccountIds = Array.from(deploymentAccountIds);

      // Create or update lesson
      customLessonRef
        .set({
          adminAccountId: adminAccountId,
          lessonTemplate: lessonTemplate,
          wordGroup: wordGroup,
          words: words,
          dueDates: dueDates,
          lessonName: lessonName
        })
        .catch(error => console.error("Error creating custom lesson: ", error));

      // Push custom lesson to deployment accounts
      let batch = this.db.batch();

      // Add/update deploymentAccount references to this custom lesson
      let deploymentRefs = deploymentAccountIds.map(id =>
        this.db.doc(`${FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL}/${id}/`)
      );

      return Promise.all(deploymentRefs.map(ref => ref.get()))
        .then(deploymentAccountDocs => {
          for (let i = 0; i < deploymentRefs.length; i++) {
            let deploymentRef = deploymentRefs[i];
            let deploymentAccountDoc = deploymentAccountDocs[i];

            // Gets existing completed assignments
            let currentCompletedDueDates = deploymentAccountDoc.data()
              .customLessons?.[customLessonRef.id];

            // Initializes/updates assignments
            let completedDueDates = {};
            Object.keys(dueDates).forEach(dueDate => {
              if (dueDates[dueDate].includes(deploymentRef.id)) {
                completedDueDates[dueDate] = Boolean(
                  currentCompletedDueDates?.[dueDate]
                );
              }
            });

            batch.update(deploymentRef, {
              [`${FIREBASE_DB.CUSTOM_LESSONS_FIELD}.${customLessonRef.id}`]: completedDueDates
            });
          }

          // Remove custom lesson for non-assigned students
          for (let deploymentAccountId of currentAssignedDeploymentIds) {
            if (!deploymentAccountIds.includes(deploymentAccountId)) {
              let deploymentRef = this.db.doc(
                `${FIREBASE_DB.DEPLOYMENT_ACCOUNTS_COL}/${deploymentAccountId}/`
              );

              batch.update(deploymentRef, {
                [`${FIREBASE_DB.CUSTOM_LESSONS_FIELD}.${customLessonRef.id}`]: app.firestore.FieldValue.delete()
              });
            }
          }
        })
        .then(() =>
          batch
            .commit()
            .catch(error =>
              console.error(
                "Pushing custom lessons to deployments failed: ",
                error
              )
            )
        );
    });
  };
}

export default Firebase;
