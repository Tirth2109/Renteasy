"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from 'react'

const Logo = () => {
    const router = useRouter()
  return (
    // <Image 
    // onClick={()=>router.push("/")}
    // alt= "logo"
    // className="hidden md:block cursor-pointer"
    // height="100"
    // width="100"
    // src="/images/logo.png"
    // />
    <>

    <img src="/images/logo.png" alt="RentEasy" 
    onClick={()=>router.push("/")}
    className= "hidden md:block cursor-pointer h-[83px] w-[95px] content-contain ml-3 mt-[-17px]"

    />
    </>
  )
}

export default Logo