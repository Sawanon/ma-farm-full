"use client"
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import Image from "next/image";
import { getIsSubscribe, startSubscribe, unsubscribe } from "./action/firebase";
import { IoRefreshOutline, IoWater } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaTemperatureLow } from 'react-icons/fa6'
import { Switch } from "@nextui-org/switch";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { FaHouseMedical } from 'react-icons/fa6'
import Link from "next/link";

type RealData = {
  humidityCondition: number,
  isWater: boolean,
  relative_humidity: number,
  relayDust: boolean,
  relayStringer: boolean,
  springer: boolean,
  temperature: string,
  timestamp: string,
}

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

export default function Home() {
  const [isWaterStatus, setIsWaterStatus] = useState(false)
  const [isWater, setIsWater] = useState(false)
  const [humidity, setHumidity] = useState(0)
  const [temperature, setTemperature] = useState("0")
  const [isSubscribe, setIsSubscribe] = useState(false)

  useEffect(() => {
    const realData = ref(database, 'real');
    onValue(realData, (snapshot) => {
      const data:RealData = snapshot.val();
      console.log("🚀 ~ onValue ~ data:", data)
      // setSpringerStatus(data.relayStringer)
      setIsWaterStatus(data.relayDust)
      setHumidity(data.relative_humidity)
      setTemperature(data.temperature)
      // setSpringer(data.springer)
      // setIsWater(data.isWater)
    });
    onValue(ref(database, 'test'), (snapshot) => {
      console.log("🚀 ~ test onValue ~ snapshot:", snapshot.val())
      setIsWater(snapshot.val().isWater)
    })
    const setup = async () => {
      const isSubscribe = await getIsSubscribe()
      console.log("🚀 ~ useEffect ~ isSubscribe:", isSubscribe)
    }
    setup()
  }, [])

  const handleOnChangeGreenHouse = (isSelected: boolean) => {
    setIsWater(
      // const isWater = !prev
      // updateHistoryWater(isWater)
      isSelected
    )
    startSubscribe()
    set(ref(database, 'test/isWater'), isSelected)
    // set(ref(database, 'real/isWater'), !isWater)
  }

  return (
    <div className={`bg-[#F4F7FB]`}>
      <div
        className={`p-4 bg-blue-400 cursor-pointer`}
        onClick={() => {
          console.log("start");
          
          // startSubscribe()
        }}
      >
        start
      </div>
      <div className={`cursor-pointer bg-red-200`} onClick={() => {unsubscribe()}}>
        unsubscribe
      </div>
      <div className={`p-4`}>
        <div className={`flex justify-between`}>
          <div className={`text-2xl font-bold`}>
            Hi baby!
          </div>
          <div className={`text-3xl`} onClick={() => window.location.reload()}>
            <IoRefreshOutline />
          </div>
        </div>
        <div className={`mt-4`}>
          <div className={`flex gap-2 items-center`}>
            <div>
              New style !
            </div>
            <div className={`text-yellow-400 text-lg`}>
              <BsStars />
            </div>
          </div>
          <Switch isSelected={isWater} onValueChange={handleOnChangeGreenHouse} />
        </div>
        <div className={`mt-4 shadow bg-white w-full text-black text-opacity-80 p-4 rounded-lg`}>
          <div className={`flex justify-between items-center`}>
            <div className={`flex gap-2 items-center`}>
              <div>
                <IoWater />
              </div>
              <div>
                Humidity
              </div>
            </div>
            <div>
              {`${humidity}%`}
            </div>
          </div>
          <div className={`mt-2 relative bg-gradient-to-r from-red-500 via-green-500 via-[70%] to-blue-500 h-6 rounded-3xl flex justify-end`}>
            <div style={{left: `${humidity}%`}} className={`w-px h-8 bg-red-700 absolute -top-1`}></div>
          </div>
        </div>
        <div className={`mt-4 shadow bg-white w-full text-black text-opacity-80 p-4 rounded-lg`}>
          <div className={`flex justify-between items-center`}>
            <div className={`flex gap-2 items-center`}>
              <div>
                <FaTemperatureLow />
              </div>
              <div>
                Temperature
              </div>
            </div>
            <div>
              {`${temperature} C`}
            </div>
          </div>
          <div className={`mt-2 relative bg-gradient-to-r from-green-500 from-[27%] to-red-500 h-6 rounded-3xl flex justify-end`}>
            <div style={{left: `${temperature}%`}} className={`w-px h-8 bg-red-700 absolute -top-1`}></div>
          </div>
        </div>
        <div className={`mt-4`}>
          {/* <TableHistory /> */}
        </div>
      </div>
    </div>
  );
}
