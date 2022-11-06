// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  addDoc,
  serverTimestamp,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const DB_NAME = "test-collection";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "test-63749.firebaseapp.com",
  projectId: "test-63749",
  storageBucket: "test-63749.appspot.com",
  messagingSenderId: "748812728195",
  appId: "1:748812728195:web:52523a98d69765c38768b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
auth.useDeviceLanguage();

export const anonymousLogin = async () => {
  try {
    await signInAnonymously(auth);
  } catch (err) {
    return console.log(err);
  }
};

export const googleLogin = async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    return console.log(err);
  }
};

export const logout = () => {
  auth.signOut();
};

export const getTestCollection = async () => {
  const q = query(collection(db, DB_NAME), orderBy("birthDate"), limit(10));
  try {
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      const _doc = doc.data();
      data.push(_doc);
    });
    return data;
  } catch (err) {
    return console.log(err);
  }
};

export const addData = async (id) => {
  try {
    const mockData = {
      name: "Paula",
      birthDate: serverTimestamp(),
      country: "Spain",
      uid: id,
    };
    const docRef = await addDoc(collection(db, DB_NAME), mockData);
    return docRef;
  } catch (err) {
    return console.log(err);
  }
};

export const getDocumentsByUserId = async (id) => {
  const q = query(
    collection(db, DB_NAME),
    where("uid", "==", id),
    orderBy("birthDate"),
    limit(10)
  );
  try {
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editDocumentById = async (docId) => {
  const docRef = doc(db, DB_NAME, docId);
  try {
    const data = await updateDoc(docRef, {
      name: "Ash",
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
