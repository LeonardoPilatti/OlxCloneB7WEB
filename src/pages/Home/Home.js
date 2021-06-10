import React from 'react';
import styles from './Home.module.css';
import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom';

const Home = () => {
  const api = useApi();

  const [stateList, setStateList] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, [api]);

  React.useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);

  return (
    <section>
      <div className={styles.searchArea}>
        <div className={`container ${styles.searchBox}`}>
          <form method="GET" action="/ads">
            <input type="text" name="q" placeholder="O que você procura?" />
            <select name="state">
              {stateList.map((i, index) => (
                <option key={index} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            <button>Pesquisar</button>
          </form>
        </div>
        <div className={`${styles.categoryList} container`}>
          {categories.map((i, index) => (
            <Link
              key={index}
              to={`/ads?cat=${i.slug}`}
              className={styles.categoryItem}
            >
              <img src={i.img} alt="" />
              <span>{i.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="container">...</div>
    </section>
  );
};

export default Home;
