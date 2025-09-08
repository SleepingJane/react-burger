import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ isOpen, onClose }) => {
  return <>{isOpen ? <div className={styles.background} onClick={onClose} /> : null}</>;
};
