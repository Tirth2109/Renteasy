'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";

import { useRouter } from "next/navigation";

import useReviewModal from "@/app/hooks/useReviewModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { Listing } from "@prisma/client";
import axios from "axios";

const ReviewModal = ({
    isOpen,
    onClose,
    listing

}:{
    isOpen:boolean
    onClose:()=>void
    listing:any
}) => {

    const reviewModal = useReviewModal(); 
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");

//   data: {
//     userId: currentUser.id,
//     listingId,
//     reviewText,
//     username: currentUser.name,
//     userImage: currentUser.image,
//   },
  
  const onSubmit = async () =>{
        const data = {
            listingId:listing?.id,
            reviewText:review,
        }
        setIsLoading(true);
        try{
            const response = await axios.post("/api/review",data);
            toast.success("Review added");
            onClose();
        }catch(error: any){
            toast.error(error?.response?.data?.error);
        }finally{
            setIsLoading(false);
        }



  }

 

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title= {`Add a review for ${listing?.title}`}
        
      />
     <input className="border border-gray-300
     
        p-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-gray-200
        
     " type="text" placeholder="Add your review" 
        onChange={(e)=>setReview(e.target.value)}
     />
    </div>
  )

  

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Review"
       actionLabel="Submit Review"
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      
    />
  );
}

export default ReviewModal;