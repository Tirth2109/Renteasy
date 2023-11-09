import { getCurrentUser } from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import { getReservations } from '@/app/actions/getReservations';
import getReviewsById from '@/app/actions/getReviewsById';

interface IParams{
    listingId?: string
}

const ListingPage = async ({params}: {params: IParams}) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser =await getCurrentUser();
    const reviews = await getReviewsById(params);

   
    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
            reviews={reviews}
        />
    </ClientOnly>
  )
}

export default ListingPage