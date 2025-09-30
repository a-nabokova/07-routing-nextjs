import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import fetchNotes  from '../../lib/api';
import NotesClient from './Notes.client'

 


  const NotesPage = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const queryClient = new QueryClient();

    const search = searchParams.search ?? '';
  const page = Number(searchParams.page ?? '1');
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage],
    queryFn: () => fetchNotes( page, perPage, search),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;