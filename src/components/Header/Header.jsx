import React from 'react';
import styles from './Header.module.scss';

const Header = ({ title, description, btnIcon, btnOnClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleBar}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.button} onClick={btnOnClick}>
          {btnIcon}
        </button>
      </div>
      <p className={styles.description}>{description}</p>
    </header>
  );
};

export default Header;
