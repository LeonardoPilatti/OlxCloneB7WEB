import React from 'react';
import { useParams } from 'react-router-dom'; /// para pegar o id do anuncio que cliquei
import styles from './AdPage.module.css';
import useApi from '../../helpers/OlxAPI';

const SignIn = () => {
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
    <section className={`${styles.adPage} container`}>
      <div className={styles.leftSide}>
        <div className={styles.box}>
          <div className={styles.adImage}>...</div>
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
        <div className={styles.box}>...</div>
        <div className={styles.box}>...</div>
      </div>
    </section>
  );
};

export default SignIn;
