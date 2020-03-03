import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2eqcsPifdGyto4IyRNxLZ326AabWNiqw",
  authDomain: "monesprit-db.firebaseapp.com",
  databaseURL: "https://monesprit-db.firebaseio.com",
  projectId: "monesprit-db",
  storageBucket: "monesprit-db.appspot.com",
  messagingSenderId: "1032472434483",
  appId: "1:1032472434483:web:c5e9259e0c7bd910391046",
  measurementId: "G-8M3MZCFJ0T"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;