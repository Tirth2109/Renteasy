import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2023-08-16",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  try {
    if (body.length > 0) {
        const session = await stripe.checkout.sessions.create({
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            
           
            invoice_creation: {
              enabled: true,
            },
            line_items: body.map((item: any) => {
              return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: item.title ? item.title : " ",
                    description: item.location ?    `${item.location?.label + "," + item.location?.region}` : " ",
                   
                    images: item.imageSrc ? [item.imageSrc] : [],
                  },
                  unit_amount: item.price ? item.price * 100: 0,
                },
                quantity: item.quantity ? item.quantity : 1,
               
                
              };
            }),
            phone_number_collection: {
              enabled: true,
            },
            

            success_url: `${request.headers.get("origin")}/trips`,
            cancel_url: `${request.headers.get("origin")}`,
          });

           
          
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}