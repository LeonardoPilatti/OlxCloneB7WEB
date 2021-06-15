import React from 'react';
import styles from './Home.module.css';
import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem/AdItem';

const Home = () => {
  const api = useApi();

  const [stateList, setStateList] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [adList, setAdList] = React.useState([]);
  React.useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, [api]);

  React.useEffect(() => {
    const getCaregories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCaregories();
  }, [api, categories]);

  React.useEffect(() => {
    const getRecentsAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8,
      });
      setAdList(json.ads);
    };
    getRecentsAds();
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
      <div className="container">
        <h2 className={styles.h2}>Anúncios Recentes</h2>
        <div className={styles.list}>
          {adList.map((i, index) => (
            <AdItem key={index} data={i} />
          ))}
        </div>
        <Link to="/ads" className={styles.seeAllLink}>
          Ver todos
        </Link>
        <hr />
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
        possimus esse, incidunt placeat debitis accusamus minima quae quo
        necessitatibus similique! Nihil libero unde quos nobis quibusdam eius
        reprehenderit adipisci vitae.
      </div>
    </section>
  );
};

export default Home;
