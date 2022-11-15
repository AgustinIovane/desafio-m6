import * as admin from "firebase-admin";
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://dwf-m6-b15ed-default-rtdb.firebaseio.com",
});

const fireStore = admin.firestore();
const rtdb = admin.database();

export { fireStore, rtdb };
