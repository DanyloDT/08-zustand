'use client';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { Note } from '@/types/note';

const NotePreview = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const onClose = () => router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={onClose}>
      <div className={css.header}>
        <h2>{note?.title}</h2>
      </div>
      <p className={css.tag}>{note?.tag}</p>
      <p className={css.content}>{note?.content}</p>
      <p className={css.date}>{note?.createdAt}</p>
      <button className={css.button} onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default NotePreview;
