import css from './loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <div className={css.spinner}></div>
      <p>Завантаження...</p>
    </div>
  );
};

export default Loader;
