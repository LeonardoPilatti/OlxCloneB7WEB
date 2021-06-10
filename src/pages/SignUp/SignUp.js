import React from 'react';
import styles from './SignUp.module.css';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

const SignUp = () => {
  const api = useApi();

  const [name, setName] = React.useState('');
  const [stateLoc, setStateLoc] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [stateList, setStateList] = React.useState([]);

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
      console.log(stateList);
    };
    getStates();
  }, [api, stateList]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    if (password !== confirmPassword) {
      setError('Senhas não batem');
      setDisabled(false);
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }

    const json = await api.register(name, email, password, stateLoc);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = '/';
    }
    setDisabled(false);
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  return (
    <section className="container">
      <h1 className="tituloPrincipal">Cadastro</h1>
      {error && <div className="errorMessage">{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.area}>
          <div className={styles.areaTitle}>Nome Completo</div>
          <div className={styles.areaInput}>
            <input
              type="text"
              disabled={disabled}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Estado</div>
          <div className={styles.areaInput}>
            <select
              value={stateLoc}
              onChange={(event) => setStateLoc(event.target.value)}
              required
            >
              <option></option>
              {stateList.map((estado, index) => (
                <option key={index} value={estado.id}>
                  {estado.name}
                </option>
              ))}
            </select>
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>E-mail</div>
          <div className={styles.areaInput}>
            <input
              type="email"
              disabled={disabled}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Senha</div>
          <div className={styles.areaInput}>
            <input
              type="password"
              disabled={disabled}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}>Confirmar senha</div>
          <div className={styles.areaInput}>
            <input
              type="password"
              disabled={disabled}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}></div>
          <div className={styles.areaInput}>
            <button className={styles.button} disabled={disabled}>
              {disabled ? 'Carregando...' : 'Fazer cadastro'}
            </button>
          </div>
        </label>
      </form>
    </section>
  );
};

export default SignUp;
