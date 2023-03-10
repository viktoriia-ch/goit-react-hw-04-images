import PropTypes from 'prop-types';
// import { memo } from 'react';

import styles from './image-gallery.module.css';

const ImageGallery = ({ children }) => (
  <ul className={styles.ImageGallery}>{children}</ul>
);

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired,
};
