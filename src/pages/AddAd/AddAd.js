import React from 'react';
import styles from './AddAd.module.css';
import useApi from '../../helpers/OlxAPI';
import { useHistory } from 'react-router-dom';

// esse maskedInput e o CreateNumberMask é do npm install react-text-mask text-mask-addons --save;
import MaskedInput from 'react-text-mask';
import CreateNumberMask from 'text-mask-addons/dist/createNumberMask';

const AddAd = () => {
  const api = useApi();

  const fileField = React.useRef();
  const history = useHistory();

  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [priceNegotiable, setPriceNegotiable] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [categories, setCategories] = React.useState('');

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    getCategories();
  }, [api]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);
    let errors = [];

    if (!title.trim()) {
      /// esse .trim() eh para tirar os espaços dentro do input, para não contar eles;
      errors.push('Sem Título');
    }

    if (!category) {
      /// se não tiver categoria, irá fazer o push no errors;
      errors.push('Sem categoria');
    }

    if (errors.length === 0) {
      const fData = new FormData(); /// esse new FormData é usado sempre que envia dados e imagens;
      fData.append('title', title);
      fData.append('price', price);
      fData.append('priceneg', priceNegotiable);
      fData.append('desc', description);
      fData.append('cat', category);

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i]);
        }
      }

      const json = await api.addAd(fData);
      if (!json.error) {
        /// se não tiver erro, ele irá direcionar para a postagem do anúncio;
        history.push(`/ad/${json.id}`);
        return;
      } else {
        setError(json.error);
      }
    } else {
      setError(errors.join('\n'));
    }

    setDisabled(false);

    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const priceMask = CreateNumberMask({
    prefix: 'R$ ',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
  });

  return (
    <section className="container">
      <h1 className="tituloPrincipal">Postar um anúncio</h1>
      {error && <div className="errorMessage">{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.area}>
          <div className={styles.areaTitle}>Título</div>
          <div className={styles.areaInput}>
            <input
              type="text"
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
            <select
              disabled={disabled}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option></option>
              {categories &&
                categories.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Preço</div>
          <div className={styles.areaInput}>
            <MaskedInput
              mask={priceMask}
              placeholder="R$ "
              disabled={disabled || priceNegotiable}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
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
