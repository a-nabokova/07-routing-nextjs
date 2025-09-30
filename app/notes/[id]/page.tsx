
 import { getSingleNote } from '../../../lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NoteDetailsClient from './NoteDetails.client';


interface Props {
    params: Promise<{ id: string }>;
}


const NoteDetails = async ({ params }: Props) => {
    const { id } = await params;
 
    const queryClient = new QueryClient()

     await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  })

    return <div>
         <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
    </div>
}


export default NoteDetails; 