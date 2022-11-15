import firebase from "firebase";
const firebaseConfig = {
    apiKey: "Us47tVebszfbDN8ECI9sj0nbM0OCEiyo18illNOV",
    authDomain: "dwf-m6-b15ed.firebaseapp.com",
    databaseURL: "https://dwf-m6-b15ed-default-rtdb.firebaseio.com",
};

const app = firebase.initializeApp(firebaseConfig);
const rtdb = firebase.database();

export { rtdb };


