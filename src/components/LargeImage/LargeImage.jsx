import PropTypes from 'prop-types';

import styles from './large-image.module.css';

const LargeImage = ({ largeImageURL }) => {
  return <img src={largeImageURL} alt="" className={styles.LargeImage} />;
};

export default LargeImage;

LargeImage.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
