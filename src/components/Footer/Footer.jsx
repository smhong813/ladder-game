import React from 'react';
import './Footer.scss';

const Footer = ({ className, children }) => {
  return (
    <footer className={`footer ${className}`}>
      <div className='container'>{children}</div>
    </footer>
  );
};

export default Footer;
