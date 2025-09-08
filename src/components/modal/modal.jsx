import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './modal-overlay/modal-overlay';

import styles from './modal.module.css';

export const Modal = ({ isOpen, onClose, headerTitle, children }) => {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleEscapeKey = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  return isOpen
    ? ReactDOM.createPortal(
        <>
          <div className={styles.container}>
            <header>
              <div className={`pt-10 pr-10 pl-10 ${styles.header}`}>
                {headerTitle && (
                  <span className="pt-5 text text_type_main-large">{headerTitle}</span>
                )}
                <div className={`pt-5 ${styles.close}`}>
                  <CloseIcon onClick={onClose} />
                </div>
              </div>
            </header>
            {children}
          </div>
          <ModalOverlay isOpen={isOpen} onClose={onClose} />
        </>,
        document.getElementById('modal')
      )
    : null;
};
