import React from 'react';
import styles from './Header.module.scss';

const Header = ({ title, description, btnIcon, btnOnClick, className }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <button className={styles.button} onClick={btnOnClick}>
        {btnIcon}
      </button>
    </header>
  );
};

export default Header;
