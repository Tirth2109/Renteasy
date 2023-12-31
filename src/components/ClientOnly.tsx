"use client";
import useGetLocation from "@/app/hooks/getLocation";
import React from "react";
import { useState, useEffect } from "react";

interface clientOnlyProps{
    children: React.ReactNode
}

const ClientOnly: React.FC<clientOnlyProps> = ({children}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
   

    setHasMounted(true)
  }, [])
    if (!hasMounted) {
        return null;
    }
  
  return (
    <>
    {children}
    </>
  );
};

export default ClientOnly;
