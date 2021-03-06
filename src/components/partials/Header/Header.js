import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {
  let logged = isLogged(); // aqui essa função retorna true ou false caso exista o token no cookie;

  const handleLogout = () => {
    doLogout();
    window.location.href = '/';
  };

  return (
    <header>
      <section className={`${styles.header} container`}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={styles.logo1}>O</span>
            <span className={styles.logo2}>L</span>
            <span className={styles.logo3}>X</span>
          </Link>
        </div>
        <nav>
          <ul className={styles.ul}>
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li>
                  <button className={styles.button} onClick={handleLogout}>
                    Sair
                  </button>
                </li>
                <li>
                  <Link to="/post-an-ad" className={styles.button}>
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
            {!logged && (
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
                <li>
                  <Link to="/post-an-ad" className={styles.button}>
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
