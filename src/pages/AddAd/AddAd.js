import React from 'react';
import styles from './AddAd.module.css';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

const AddAd = () => {
  const api = useApi();

  const fileField = React.useRef();

  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceNegotiable, setPriceNegotiable] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    //   const json = await api.login(email, password);

    //   if (json.error) {
    //     setError(json.error);
    //   } else {
    //     doLogin(json.token, rememberPassword);
    //     window.location.href = '/';
    //   }
    //   setDisabled(false);
    //   setTimeout(() => {
    //     setError('');
    //   }, 2000);
  };

  return (
    <section className="container">
      <h1 className="tituloPrincipal">Postar um anúncio</h1>
      {error && <div className="errorMessage">{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.area}>
          <div className={styles.areaTitle}>Título</div>
          <div className={styles.areaInput}>
            <input
              type="email"
              disabled={disabled}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Categoria</div>
          <div className={styles.areaInput}>
            <select name="" id=""></select>
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Preço</div>
          <div className={styles.areaInput}>...</div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Preço Negociável</div>
          <div className={styles.areaInput}>
            <input
              type="checkbox"
              disabled={disabled}
              checked={priceNegotiable}
              onChange={(event) => setPriceNegotiable(!priceNegotiable)}
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Descrição</div>
          <div className={styles.areaInput}>
            <textarea
              disabled={disabled}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </label>

        {/* esse multiple do file eh para aceitar mais fotos de uma vez */}
        <label className={styles.area}>
          <div className={styles.areaTitle}>Imagens (1 ou mais)</div>
          <div className={styles.areaInput}>
            <input type="file" disabled={disabled} ref={fileField} multiple />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}></div>
          <div className={styles.areaInput}>
            <button className={styles.button} disabled={disabled}>
              {disabled ? 'Criando anúncio...' : 'Adicionar anúncio'}
            </button>
          </div>
        </label>
      </form>
    </section>
  );
};

export default AddAd;
