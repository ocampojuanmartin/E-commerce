import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyAjIg7yy9w-0-uJDg3gCiQggURi9GAV5ek",
  authDomain: "e-commerce-8cdcd.firebaseapp.com",
  projectId: "e-commerce-8cdcd",
  storageBucket: "e-commerce-8cdcd.appspot.com",
  messagingSenderId: "1015286684814",
  appId: "1:1015286684814:web:7dfa11599e24d42834bddf"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };