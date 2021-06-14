import React from 'react';
import styles from './Ads.module.css';
import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem/AdItem';

const Ads = () => {
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
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);

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
    <section className={`${styles.ads} container`}>
      <div className={styles.leftSide}>
        <form method="get">
          <input type="text" name="q" />
          <div className={styles.filterName}>Estado:</div>
          <select name="state">
            <option></option>
            {stateList.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>

          <div className={styles.filterName}>Categoria:</div>
          <ul>
            {categories.map((i, index) => {
              <li key={index} className={styles.categoryItem}>
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </li>;
            })}
          </ul>
        </form>
      </div>
      <div className={styles.rightSide}>direita</div>
    </section>
  );
};

export default Ads;
