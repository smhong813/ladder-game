import { useEffect, useRef, useState } from 'react';
import styles from './Popup.module.scss';

const Popup = ({
  children,
  onClose,
  maxOpacity = 0.25,
  animDuration = 500,
}) => {
  const [dimOpacity, setDimOpacity] = useState(0);
  const dimRef = useRef();
  const popupRef = useRef();

  const open = () => {
    const dimAnim = dimRef.current.animate(
      [{ opacity: dimOpacity }, { opacity: maxOpacity }],
      {
        duration: animDuration,
        easing: 'ease',
      }
    );
    dimAnim.onfinish = () => {
      setDimOpacity(maxOpacity);
    };
  };

  const close = () => {
    const popupAnim = popupRef.current.animate(
      [{ opacity: dimOpacity }, { opacity: 0 }],
      {
        duration: animDuration,
        easing: 'ease',
      }
    );
    const dimAnim = dimRef.current.animate(
      [{ opacity: dimOpacity }, { opacity: 0 }],
      {
        duration: animDuration,
        easing: 'ease',
      }
    );
    dimAnim.onfinish = () => {
      setDimOpacity(0);
      onClose();
    };
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    open();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div onClick={() => close()}>
      <div
        className={styles.dimPage}
        style={{ opacity: dimOpacity }}
        ref={dimRef}
      ></div>
      <div className={`${styles.popup}`} ref={popupRef}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
