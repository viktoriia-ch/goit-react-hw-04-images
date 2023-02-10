import { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.css';

const Button = ({ loadMore }) => (
  <button onClick={loadMore} className={styles.Button}>
    Load more
  </button>
);

export default memo(Button);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
