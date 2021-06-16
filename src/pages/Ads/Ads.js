import React from 'react';
import styles from './Ads.module.css';
import useApi from '../../helpers/OlxAPI';
import { useLocation, useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem/AdItem';

let timer;

const Ads = () => {
  const api = useApi();
  const history = useHistory();

  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQueryString();
  const [q, setQ] = React.useState(
    query.get('q') != null ? query.get('q') : '',
  );
  const [cat, setCat] = React.useState(
    query.get('cat') != null ? query.get('cat') : '',
  );
  const [state, setState] = React.useState(
    query.get('state') != null ? query.get('state') : '',
  );

  const [adsTotal, setAdsTotal] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1); // esse é para ver onde estou na página

  const [stateList, setStateList] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [adList, setAdList] = React.useState([]);

  const [resultOpacity, setResultOpacity] = React.useState(1);

  const [loading, setLoading] = React.useState(true);

  const getAdsList = async () => {
    setLoading(true);

    let offset = (currentPage - 1) * 2;

    const json = await api.getAds({
      sort: 'desc',
      limit: 8,
      q,
      cat,
      state,
      offset,
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  React.useEffect(() => {
    // Esse MAth.ceil() sempre irá arredondar para cima;
    if (adList.length > 0) {
      setPageCount(Math.ceil(adsTotal / adList.length));
    } else {
      setPageCount(0);
    }
  }, [adsTotal, adList.length]);

  React.useEffect(() => {
    setResultOpacity(0.3);
    getAdsList();
  }, [currentPage]);

  React.useEffect(() => {
    let queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }

    history.replace({
      // com esse join estou juntando todos os objetivos do queryString com o "&" comercial;
      search: `?${queryString.join('&')}`,
    });

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(getAdsList, 1000);
    setResultOpacity(0.3);
    setCurrentPage(1);
  }, [q, cat, state]);

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

  let paginacao = [];
  for (let i = 1; i <= pageCount; i++) {
    paginacao.push(i);
  }

  return (
    <section className={`${styles.ads} container`}>
      <div className={styles.leftSide}>
        <form method="get">
          <input
            type="text"
            name="q"
            placeholder="O que você procura?"
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
          <div className={styles.filterName}>Estado:</div>
          <select
            name="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option></option>
            {stateList.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>

          <div className={styles.filterName}>Categoria:</div>
          <ul className={styles.lista}>
            {categories.map((i, index) => (
              <li
                key={index}
                className={styles.categoryItem}
                className={
                  cat === i.slug
                    ? `${styles.categoryItem} ${styles.active}`
                    : styles.categoryItem
                }
                onClick={() => setCat(i.slug)}
              >
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </li>
            ))}
          </ul>
        </form>
      </div>
      <div className={styles.rightSide}>
        <h2>Resultados</h2>

        {loading && adList.length === 0 && (
          <div className={styles.listWarning}>Carregando...</div>
        )}
        {!loading && adList.length === 0 && (
          <div className={styles.listWarning}>Não encontramos resultados.</div>
        )}
        <div className={styles.listRight} style={{ opacity: resultOpacity }}>
          {adList.map((i, index) => (
            <AdItem key={index} data={i} />
          ))}
        </div>
        <div className={styles.paginacao}>
          {paginacao.map((i, index) => (
            <div
              onClick={() => setCurrentPage(i)}
              className={
                i === currentPage
                  ? `${styles.pagItem} ${styles.active}`
                  : `${styles.pagItem}`
              }
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ads;
