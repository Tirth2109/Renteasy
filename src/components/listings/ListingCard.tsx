"use client"

import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import { AiFillStar } from "react-icons/ai";
import { IoPeopleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";


interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;

}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = " ",
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const router = useRouter()

    
  
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  
  const randomRating: any = (Math.random() * (4.8 - 2.5) + 2.5).toFixed(1);


  const randomPeople: any = Math.floor(Math.random() * (150 - 20 + 1) + 20);


  return (
    
    <div 
    onClick={() => router.push(`/listings/${data.id}`)} 
    className="col-span-1 cursor-pointer group"
  >

      <div className="flex flex-col gap-2 w-full"
     
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex items-center gap-1 font-bold text-xl">
            <span className="text-sm text-neutral-500 flex flex-row justify-center items-center">
              {randomRating} <AiFillStar className="text-yellow-400" />{" "}
            </span>{" "}
            <span className="text-sm text-neutral-500 flex flex-row justify-center items-center ">
              ({randomPeople} {" "}<IoPeopleSharp  className="ml-1"/>)
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>

        {onAction && actionLabel && 
         actionLabel   ? 
        (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        ):  null}
        </div>
      </div>
   
  );
};

export default ListingCard;
