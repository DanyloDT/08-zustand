import css from './loading.module.css';
const Loading = () => {
  return (
    <div className={css.backdrop}>
      <p className={css.text}>Loading, please wait...</p>
    </div>
  );
};

export default Loading;
