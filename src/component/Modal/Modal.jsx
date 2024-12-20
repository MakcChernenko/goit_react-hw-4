import css from './modal.module.css';

const Modal = ({ image, closeImage, nextImage, prevImage }) => {
  return (
    <div className={css.container}>
      <div className={css.modal} onClick={closeImage}>
        <img
          className={css.modalImg}
          src={image.urls.full}
          alt={image.alt_description}
          onClick={closeImage}
        />
      </div>
      <div className={css.modalBtnContainer}>
        <button className={css.modalBtn} onClick={prevImage}>
          {'<'}
        </button>
        <button className={css.modalBtn} onClick={nextImage}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
