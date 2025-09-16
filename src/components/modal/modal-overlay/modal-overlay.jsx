import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ modalOverlayRef, children }) => {
  return (
    <>
      <div className={styles.background} ref={modalOverlayRef}>
        {children}
      </div>
    </>
  );
};
