import Image from "next/image";

interface ListingReviewProps {
  reviews: any;
}
const ListingReview = ({ reviews }: ListingReviewProps) => {
  return (
    <div
      className="flex flex-col
    gap-4
    mt-10
    border
    border-neutral-600
    pt-6
    px-4
    py-6
    rounded-lg
   
    "
    >
         <h2
            className="
                text-2xl 
                font-semibold
                text-neutral-900
                text-center
                "
          >
            Reviews
          </h2>
      {reviews?.map((review: any) => (
        <div className="flex flex-col gap-2
           
            border-neutral-200
            pb-2
            

        " key={review?.id}>
         
          <div className="flex flex-col gap-2
            border
            border-neutral-200
            p-3
            rounded-lg
            bg-white/60
           

          ">
            <div className="flex flex-row gap-2 items-center">
              {review?.userImage ? (
                <Image
                  src={review?.userImage}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User Image"
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 text-neutral-500">
                  <span className="text-sm font-semibold">
                    {review?.username[0]}
                  </span>
                </div>
              )}

              <div className="flex flex-col">
                <p className="text-md font-semibold">{review?.username}</p>
              </div>
            </div>
            <p className="text-xl ml-4
            text-neutral-900

            ">{review?.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingReview;
