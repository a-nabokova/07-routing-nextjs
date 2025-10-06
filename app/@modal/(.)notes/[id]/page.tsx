 import { getSingleNote } from '@/lib/api';
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

 
interface Props {
  params: Promise<{id: string}>;
}

const NotePreviewPage = async ({ params }: Props) => {
    const { id } = await params;


    const queryClient = new QueryClient();

await queryClient.prefetchQuery({
  queryKey: ['note', id],
  queryFn: () => getSingleNote(id),
});
  
  const dehydratedState = dehydrate(queryClient);

 
  return (
      <HydrationBoundary state={dehydratedState}>
        <NotePreview id={id} />
    </HydrationBoundary>
  );
};

export default NotePreviewPage;