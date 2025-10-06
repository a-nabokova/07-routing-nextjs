'use client';
 
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';
import { getSingleNote } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';



interface NotePreviewProps {
   id: string;
}
 
export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery<Note>({
  queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,

});

   if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading note</div>;

  return (
    <Modal>
    <div className={css.container}>
      <button className={css.backBtn} onClick={() => router.back()}>
        ← Go Back
      </button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
          <span className={css.tag}>{note?.tag}</span>
        </div>

        <div className={css.content}>{note?.content}</div>
        <div className={css.date}>{note?.createdAt}</div>
      </div>
      </div>
      </Modal>
  );
}