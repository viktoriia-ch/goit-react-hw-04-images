import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.css';

const ImageGalleryItem = ({ images, showImage }) => {
  return images.map(({ id, webformatURL, largeImageURL }) => (
    <li
      className={styles.ImageGallery_item}
      key={id}
      onClick={() => showImage({ largeImageURL })}
    >
      <img className={styles.ImageGallery_image} src={webformatURL} alt="" />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  images: [],
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  showImage: PropTypes.func.isRequired,
};
