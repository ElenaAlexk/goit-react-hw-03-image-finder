import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={css.Gallery}>
        <ImageGalleryItem images={images} />
      </ul>
    </>
  );
};
