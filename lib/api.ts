import axios from 'axios';
import type { Note } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNoteResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNoteResponse> => {
  const { data } = await instance.get<FetchNoteResponse>('/notes', { params });

  return data;
};

export const createNote = async (
  params: Pick<Note, 'title' | 'content' | 'tag'>,
): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', params);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};
