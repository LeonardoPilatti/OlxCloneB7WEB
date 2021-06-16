import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.back}>
      <div className={`${styles.footer} container`}>
        <p>Todos os direitos reservados</p>
        <p>Clone OLX - B7WEB</p>
        <p>Feito por: Leonardo Pilatti Dal Puppo</p>
      </div>
    </footer>
  );
};

export default Footer;
