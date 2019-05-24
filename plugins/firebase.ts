import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

let instance: firebase.app.App;

const getInstance = () => {
  if (!firebase.apps.length) {
    instance = firebase.initializeApp(config);
  }
  return instance;
};

export const app = getInstance();
export const auth = firebase.auth();
export const db = firebase.firestore();

export const toArray = (snapshot: firebase.firestore.QuerySnapshot) => {
  const array: any[] = [];
  snapshot.forEach(doc => {
    array.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return array;
};

export { firebase };
