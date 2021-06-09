import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import { isLogged } from '../../../helpers/AuthHandler';

const Header = () => {
  let logged = isLogged(); // aqui essa função retorna true ou false caso exista o token no cookie;

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
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li>
                  <Link to="/logout">Cadastrar</Link>
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
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/cadastrar">Cadastrar</Link>
                </li>
                <li>
                  <Link to="/signin" className={styles.button}>
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
