import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header>
      <section className="container">
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logo1}>O</span>
            <span className={styles.logo2}>L</span>
            <span className={styles.logo3}>X</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="">Login</Link>
            </li>
            <li>
              <Link to="">Cadastrar</Link>
            </li>
            <li>
              <Link to="" className={styles.button}>
                Poste um anúncio
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
