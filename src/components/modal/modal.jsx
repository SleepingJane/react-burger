import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './modal-overlay/modal-overlay';

import styles from './modal.module.css';

export const Modal = ({ onClose, headerTitle, children }) => {
  const modalRef = React.useRef();
  const modalOverlayRef = React.useRef();

  React.useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    const handleClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const modalOverlayRefCurrent = modalOverlayRef.current;
    modalOverlayRefCurrent.addEventListener('click', handleClick);

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      modalOverlayRefCurrent.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay modalOverlayRef={modalOverlayRef}>
      <div className={styles.container} ref={modalRef}>
        <h3>
          <div className={`pt-10 pr-10 pl-10 ${styles.header}`}>
            {headerTitle && (
              <span className="pt-5 text text_type_main-large">{headerTitle}</span>
            )}
            <div className={`pt-5 ${styles.close}`}>
              <CloseIcon onClick={onClose} />
            </div>
          </div>
        </h3>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal')
  );
};
