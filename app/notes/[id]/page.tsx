import { fetchNoteById } from '@/lib/api';

import NoteDetails from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
type Props = {
  params: Promise<{ id: string }>;
};
const NoteDetail = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
};

export default NoteDetail;
