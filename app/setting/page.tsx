"use client"
import React, { useEffect, useState } from 'react'
import { getIsSubscribe, getSetting, saveSetting } from '../action/firebase'
import { Button, Modal, ModalBody, ModalContent, Switch } from '@nextui-org/react'
import { FaCheck, FaInfo, FaXmark } from 'react-icons/fa6'

const Setting = () => {
  const [isSubscribe, setIsSubscribe] = useState(false)
  const [status, setStatus] = useState<Status>("idle")
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const setup = async () => {
      // const isSubscribe = await getIsSubscribe()
      // console.log("🚀 ~ setup ~ isSubscribe:", isSubscribe)
      // setIsSubscribe(isSubscribe)
      const setting = await getSetting()
      console.log("🚀 ~ setup ~ setting:", setting)
      setIsSubscribe(setting.isSubscribeDustRelay)
    }
    setup()
  }, [])

  const handleOnChangeIsSubscribe = (isSelected: boolean) => {
    console.log("🚀 ~ handleOnChangeIsSubscribe ~ isSelected:", isSelected)
    setIsSubscribe(isSelected)
  }

  const handleOnSave = async () => {
    const setting:Setting = {
      isSubscribeDustRelay: isSubscribe,
    }
    const success = await saveSetting(setting)
    if(success){
      setStatus("sccuess")
    }else{
      setStatus("error")
    }
    setIsOpen(true)
  }

  return (
    <div className={`p-4`}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <ModalContent>
          <ModalBody>
            <Icon status={status} />
            <div className={`capitalize font-bold text-2xl mx-auto`}>
              {status}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={`flex justify-end gap-4`}>
        <Button>
          Discard
        </Button>
        <Button
          color={`primary`}
          onClick={handleOnSave}
        >
          Save
        </Button>
      </div>
      <div className={`container bg-neutral-900 mx-auto p-4 rounded-md mt-4 divide-y-1 divide-gray-100`}>

        <div className={`flex justify-between items-center bg-background rounded-md p-4`}>
          <div>
            <div className={`font-bold`}>
              บันทึกการทำงานของสวิชต์ เปิด-ปิดน้ำ
            </div>
            <div className={`text-sm text-opacity-80 text-black dark:text-white dark:text-opacity-60`}>
              บันทึกประวัติการทำงานของสวิชต์ เปิด-ปิดน้ำ การทำงานของอุปกรณ์จริง ๆ
            </div>
          </div>
          <Switch
            isSelected={isSubscribe}
            onValueChange={handleOnChangeIsSubscribe}
          />
        </div>

      </div>
    </div>
  )
}

export default Setting

const Icon = ({status}: {status: Status}) => {
  const icon = () => {
    const size = 42
    if(status === "sccuess"){
      return <FaCheck size={size} />
    }else if(status === "error"){
      return <FaXmark size={size} />
    }
    return <FaInfo size={size} />
  }
  return (
    <div className={`w-20 h-20 rounded-full flex justify-center items-center mx-auto ${status === 'sccuess' ? 'bg-green-500' : status === "error" ? 'bg-red-500' : "bg-blue-500"} `}>
      {icon()}
    </div>
  )
}