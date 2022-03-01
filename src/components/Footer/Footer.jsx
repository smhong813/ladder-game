import React from 'react';
import styles from './Footer.module.scss';

const Footer = ({ className, children }) => {
  return (
    <footer className={`${styles.footer} ${className}`}>{children}</footer>
  );
};

export default Footer;
