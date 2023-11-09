"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { isInterfaceDeclaration } from "typescript";

import {signOut} from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";
import useGetLocation from "@/app/hooks/getLocation";
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
 
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const router = useRouter();
  const handleLogout=()=>{
    signOut();
    router.push("/");
  }
  const onRent=useCallback(()=>{
    if(!currentUser){
     return  loginModal.onOpen();
    }
    rentModal.onOpen();


  },[currentUser,loginModal, rentModal])



  return (
    <div className="relative flex flex-row">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {
            rentModal.onOpen();
          }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          RentEasy your home
        </div>
      </div>
      <div
        onClick={toggleOpen}
        className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar  src= {currentUser?.image}/>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={()=>router.push("/trips")} label="My trips" />
                <MenuItem onClick={() => router.push("/favorites")} label="My favourites" />
                <MenuItem onClick={() => router.push("/reservations")} label="My reservation" />
                <MenuItem onClick={() => router.push("/properties")} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="RentEasy my home" />
                <hr />
                <MenuItem onClick={handleLogout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
