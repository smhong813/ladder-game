import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/slices/bottomSheet';
import styles from './BottomSheet.module.scss';

const BottomSheet = ({
  children,
  onClose,
  maxOpacity = 0.25,
  animDuration = 500,
}) => {
  const [popupHeight, setPopupHeight] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentBottom, setCurrentBottom] = useState('-100%');
  const [dimOpacity, setDimOpacity] = useState(0);
  const dimRef = useRef();
  const popupRef = useRef();
  const dispatch = useDispatch();
  const closeState = useSelector(selectors.close);

  useEffect(() => {
    if (closeState) {
      close();
    }
  }, [closeState]);

  const open = () => {
    const poupAnim = popupRef.current.animate(
      [{ bottom: `${currentBottom}px` }, { bottom: 0 }],
      {
        duration: animDuration,
        easing: 'ease',
      }
    );
    poupAnim.onfinish = () => {
      setCurrentBottom(0);
    };
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
    const poupAnim = popupRef.current.animate(
      [{ bottom: `${currentBottom}px` }, { bottom: '-100%' }],
      {
        duration: animDuration,
        easing: 'ease',
      }
    );
    poupAnim.onfinish = () => {
      setCurrentBottom('-100%');
    };
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
      dispatch(actions.close(false));
    };
  };

  const handleTouch = (e) => {
    const currentY = e.changedTouches[0].clientY;
    const diff = currentY - startY;
    // const opacity = maxOpacity - diff * 0.0005;
    const opacity = maxOpacity - diff * (maxOpacity / popupHeight);
    // 500 : 0.25 = 1 : x
    // 500x = 0.25
    // x = 0.25 / 500 (maxOpacity / popupHeight)
    // x = 5 / 10000 = 0.0005

    if (e.type === 'touchstart') {
      setStartY(e.changedTouches[0].clientY);
    } else if (e.type === 'touchmove') {
      if (diff >= 0) {
        setCurrentBottom(-diff);
        setDimOpacity(opacity);
      }
    } else if (e.type === 'touchend') {
      if (diff > popupHeight / 2) {
        close();
      } else {
        open();
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setPopupHeight(popupRef.current.clientHeight);
    open();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div>
        <div
          className={styles.dimPage}
          style={{ opacity: dimOpacity }}
          ref={dimRef}
          onClick={() => close()}
        ></div>
        <div
          className={`${styles.popup}`}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleTouch}
          style={{ bottom: currentBottom }}
          ref={popupRef}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
