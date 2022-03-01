import React from 'react';
import './Footer.scss';

const Footer = ({ className, children }) => {
  return <footer className={`footer ${className}`}>{children}</footer>;
};

export default Footer;
