

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import fetchNotes from '@/lib/api';
import NotesClient from './Notes.client';

interface PageProps {
  params: { slug?: string[] };
  searchParams: { search?: string; page?: string };
}

export default async function NotesPage({ params, searchParams }: PageProps) {
  const queryClient = new QueryClient();

  const search = searchParams.search ?? '';
  const page = Number(searchParams.page ?? '1');
  const perPage = 12;

   const tag = params.slug?.[0];  

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage, tag],
    queryFn: () =>
      fetchNotes({
        search,
        page,
        perPage,
        ...(tag && tag !== 'All' ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

 