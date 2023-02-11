import { useEffect, useCallback, memo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ close, children }) => {
  const closeModalByClickOnOverlay = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    const closeModalByClickOnEscape = event => {
      if (event.code === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', closeModalByClickOnEscape);

    return () =>
      document.removeEventListener('keydown', closeModalByClickOnEscape);
  }, [close]);

  return createPortal(
    <div className={styles.Overlay} onClick={closeModalByClickOnOverlay}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default memo(Modal);

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
