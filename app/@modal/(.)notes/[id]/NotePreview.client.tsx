'use client';

import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';


interface NotePreviewProps {
  note: Note;
}
 
export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={() => router.back()}>
        ← Go Back
      </button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>{note.content}</div>
        <div className={css.date}>{note.createdAt}</div>
      </div>
    </div>
  );
}