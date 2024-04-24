"use server";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqDOZwPNUnOl-r-J1p5fUIvcM7TRE2mKs",
  authDomain: "ma-farm-170a7.firebaseapp.com",
  databaseURL: "https://ma-farm-170a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ma-farm-170a7",
  storageBucket: "ma-farm-170a7.appspot.com",
  messagingSenderId: "1047542618698",
  appId: "1:1047542618698:web:f0bf748061f1c67495a4b3"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let isSubscribe = false

export const startSubscribe = () => {
  const realData = ref(database, 'test');
  if(isSubscribe) {
    console.log("🚀 ~ startSubscribe ~ isSubscribe:", isSubscribe)
    return
  }
  isSubscribe = true
  const unsubscribe = onValue(realData, (snapshot) => {
    console.log("🚀 ~ onValue ~ snapshot:", snapshot.val())
    if(snapshot.val() === "close")
    unsubscribe()
  })
}

export const unsubscribe = () => {
  isSubscribe = false
  const realData = ref(database, 'test');
  set(realData, "close")
}