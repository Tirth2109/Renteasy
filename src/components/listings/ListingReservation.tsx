'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import StripeCheckOutButton from "./Checkout";
import getStipePromise from "@/app/libs/stripe";
import useCountries from "@/app/hooks/useCountries";
import { toast } from "react-hot-toast";


interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value:Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  title,
  locationValue,
  imageSrc,
  id,
}) => {
  const products = [
    {
      product: 1,
      name: "Stripe Product",
      price: 400,
      quantity: 3,
    },
    {
      product: 2,
      name: "Stripe Product2",
      price: 40,
      quantity: 2,
    },
    {
      product: 3,
      name: "Stripe Product23",
      price: 4000,
      quantity: 1,
    },
  ];

  const { getByValue } = useCountries();
  const location = getByValue(locationValue ? locationValue : "");

  const listingDetails =[ {
    id: id,
    title: title,
    price: totalPrice,
    imageSrc: imageSrc,
    location: location,
  }];

  const handleCheckout = async () => {
    onSubmit();
    const stripe = await getStipePromise();
    
    
    const response = await fetch("/api/stripe-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(listingDetails),
    });
  
    const data = await response.json();
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id })
      
     }
     

    
 


  };
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
       
      "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          $ {price}
        </div>
        <div className="font-light text-neutral-600">
          /night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={handleCheckout}
        />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        
        <div>
          $ {totalPrice}
        </div>
      </div>

    </div>
   );
}
 
export default ListingReservation;