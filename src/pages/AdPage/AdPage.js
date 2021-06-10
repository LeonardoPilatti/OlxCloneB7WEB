import React from 'react';
import { useParams } from 'react-router-dom'; /// para pegar o id do anuncio que cliquei
import styles from './AdPage.module.css';
import useApi from '../../helpers/OlxAPI';

const SignIn = () => {
  const api = useApi();

  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [adInfo, setAdInfo] = React.useState([]);
  //console.log(id);

  return (
    <section className={`${styles.adPage} container`}>
      <div className={styles.leftSide}>
        <div className={styles.box}>
          <div className={styles.adImage}>...</div>
          <div className={styles.adInfo}>
            <div className={styles.adName}>...</div>
            <div className={styles.adDescription}>...</div>
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
