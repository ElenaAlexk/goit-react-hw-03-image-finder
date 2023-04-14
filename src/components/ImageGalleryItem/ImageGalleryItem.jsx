export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images.map(item => (
        <li key={item.id} class="galleryItem">
          <img
            class="imageGalleryItem"
            src={item.webformarURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
};
