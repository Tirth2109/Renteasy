import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    listingId,

    reviewText,
  } = body;

  const review = await prisma.review.create({
    data: {
      userId: currentUser.id,
      listingId,
      reviewText,
      username: currentUser.name,
      userImage: currentUser.image,
    },
  });

  return NextResponse.json(review);
}
