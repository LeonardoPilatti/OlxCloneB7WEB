import React from 'react';
import { useParams, Link } from 'react-router-dom'; /// para pegar o id do anuncio que cliquei
import styles from './AdPage.module.css';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem/AdItem';

import { Slide } from 'react-slideshow-image'; /// esse é para fazer funcionar o componente de imagem do react;
import 'react-slideshow-image/dist/styles.css'; /// é importante para funcionar no slide tbm;
const AdPage = () => {
  const api = useApi();

  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [adInfo, setAdInfo] = React.useState({});
  //console.log(id);

  React.useEffect(() => {
    const getAdInfo = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      setLoading(false);
    };
    getAdInfo(id);
  }, [api, id]);

  const formatDate = (date) => {
    let cDate = new Date(date);

    let months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <section className="container">
      {adInfo.category && (
        <div className={styles.breadChumb}>
          <p>Você está aqui:</p>
          <div className={styles.breadChumb}>
            <Link to="/">Home</Link>
            <p>/</p>
            <Link to={`/ads?state=${adInfo.stateName}`}>
              {adInfo.stateName}
            </Link>
            <p>/</p>
            <Link
              to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
            >
              {adInfo.category.name}
            </Link>
            <p>/</p>
            <p>{adInfo.title}</p>
          </div>
        </div>
      )}
      <div className={styles.adPage}>
        <div className={styles.leftSide}>
          <div className={styles.box}>
            <div className={styles.adImage}>
              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, key) => (
                    <div key={key} className={styles.eachSlide}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className={styles.adInfo}>
              <div className={styles.adName}>
                {adInfo.title && <h2>{adInfo.title}</h2>}
                {adInfo.dateCreated && (
                  <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                )}
              </div>
              <div className={styles.adDescription}>
                {adInfo.description}
                <hr />
                {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.box}>
            {adInfo.priceNegotiable && 'Preço Negociável'}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div className={styles.price}>
                Preço: <span>R$ {adInfo.price}</span>
              </div>
            )}
          </div>
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                className={styles.contactSellerLink}
              >
                Fale com o vendedor
              </a>
              <div className={`${styles.box} ${styles.createdBy}`}>
                Anúncio por: <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}
        </div>
      </div>
      {adInfo.others && (
        <div className={styles.others}>
          <h2>Outros anúnios do vendedor: </h2>
          <div className={styles.list}>
            {adInfo.others.map((i, index) => (
              <AdItem key={index} data={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdPage;
