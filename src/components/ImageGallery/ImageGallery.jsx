import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <ul class="gallery">
        <ImageGalleryItem images={images} />
      </ul>
    </>
  );
};
