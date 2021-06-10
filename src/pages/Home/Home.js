import React from 'react';
import styles from './Home.module.css';
import useApi from '../../helpers/OlxAPI';

const Home = () => {
  const api = useApi();

  return (
    <section>
      <div className={styles.searchArea}>
        <div className={`container ${styles.searchBox}`}>
          <form method="GET" action="/ads">
            <input type="text" name="q" placeholder="O que você procura?" />
            <select name="state"></select>
            <button>Pesquisar</button>
          </form>
        </div>
        <div className={styles.categoryList}></div>
      </div>
      <div className="container">...</div>
    </section>
  );
};

export default Home;
