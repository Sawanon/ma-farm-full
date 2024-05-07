"use server";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, set, get, child } from "firebase/database";

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

export const getIsSubscribe = async ():Promise<boolean> => isSubscribe

export const startSubscribe = () => {
  let isFirstStart = true
  const realData = ref(database, 'test');
  if(isSubscribe) {
    console.log("🚀 ~ startSubscribe ~ isSubscribe:", isSubscribe)
    return
  }
  isSubscribe = true
  const unsubscribe = onValue(realData, (snapshot) => {
    const data = snapshot.val()
    console.log("🚀 ~ unsubscribe ~ data:", data)
    if(isFirstStart === false && data.isSubscribe === false){
      unsubscribe()
      isSubscribe = false
    }
    isFirstStart = false
  })
}

export const unsubscribe = () => {
  isSubscribe = false
  const realData = ref(database, 'test');
  set(realData, "close")
}

const appendHistory = (value: any) => {
  const historyRef = ref(database, 'history')
  const newHistory = push(historyRef)
  set(newHistory, value).then((value) => {
    console.log("🚀 ~ set ~ value:", value)
  })
}

export const saveSetting = async (settingValue: Setting): Promise<boolean> => {
  try {
    const refSetting = ref(database, 'setting')
    await set(refSetting, settingValue)
    return true
  } catch (error) {
    throw error
  }
}

export const getSetting = async ():Promise<Setting> => {
  const data = await get(child(ref(database), "setting"))
  return data.val()
}