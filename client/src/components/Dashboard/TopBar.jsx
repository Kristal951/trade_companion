import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";

const TopBar = () => {
  return (
    <div className='w-full h-[70px] flex bg-transparent items-center px-4 justify-end'>
        <div className="flex items-center ">
            <div className="flex relative hover:bg-cyan-200 rounded-full p-2">
                <IoNotificationsOutline className='text-3xl text-gray-600 cursor-pointer'/>
                <span className="bg-red-500 rounded-full w-[15px] h-[15px] absolute top-1 right-2 border-white border-[2px]"/>
            </div>
        </div>
    </div>
  )
}

export default TopBar