'use client';

import css from './Notes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import EmptyState from '@/components/EmptyState/EmptyState';

const NotesClient = ({ tag }: { tag?: string }) => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isError, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { notes = [], totalPages = 0 } = data || {};

  if (isError) {
    throw error;
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={debouncedSearch} />
        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
        <button
          className={css.button}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Create note +
        </button>
      </div>

      {data && notes.length === 0 ? <EmptyState /> : <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(!isModalOpen)}>
          <NoteForm onClose={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
