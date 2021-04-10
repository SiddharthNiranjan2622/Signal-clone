import * as firebase from 'firebase'
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCZt3wTCFHn5ciN0gudTjTajksf9rytp_g",
  authDomain: "signal-clone-pvt.firebaseapp.com",
  projectId: "signal-clone-pvt",
  storageBucket: "signal-clone-pvt.appspot.com",
  messagingSenderId: "605571928896",
  appId: "1:605571928896:web:65b8359a63c73cfebce0a5"
};
let app;

if (firebase.apps.length === 0) {

  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }