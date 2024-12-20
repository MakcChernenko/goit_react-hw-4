import css from './imageGallery.module.css';

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <div className={css.photoGallery}>
      {photos.map((photo, index) => (
        <div key={photo.id} className={css.photo}>
          <img
            src={photo.urls.small}
            alt={photo.alt_description}
            onClick={() => onImageClick(index)}
          />
        </div>
      ))}

    </div>
  );
};

export default ImageGallery;
