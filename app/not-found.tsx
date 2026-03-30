import css from '@/app/HomePage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'This page does not exist',
  openGraph: {
    title: 'Page not found | NoteHub',
    description: 'This page does not exist',
    url: 'https://your-site.com/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
