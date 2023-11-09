import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getReviewsById(
  params: IParams
) {
  try {
    const { listingId } = params;
    // userId: currentUser.id,
    // listingId,
    // reviewText,
    // username: currentUser.name,
    // userImage: currentUser.image,

    const reviews = await prisma.review.findMany({
        where: {
            listingId: listingId,
        },
        
    });

    if (!reviews) {
        return null;
        }

    return reviews;



   
  } catch (error: any) {
    throw new Error(error);
  }
}