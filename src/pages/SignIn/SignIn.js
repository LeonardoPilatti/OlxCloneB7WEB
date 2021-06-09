import React from 'react';
import styles from './SignIn.module.css';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

const SignIn = () => {
  const api = useApi();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberPassword, setRememberPassword] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisabled(true);

    const json = await api.login(email, password);

    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = '/';
    }
    setDisabled(false);
    const sumirErro = setTimeout(() => {
      setError('');
    }, 2000);
  };

  return (
    <section className="container">
      <h1 className="tituloPrincipal">Login</h1>
      {error && <div className="errorMessage">{error}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
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
          <div className={styles.areaTitle}>Lembrar senha</div>
          <div className={styles.areaInput}>
            <input
              type="checkbox"
              checked={rememberPassword}
              disabled={disabled}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
          </div>
        </label>

        <label className={styles.area}>
          <div className={styles.areaTitle}></div>
          <div className={styles.areaInput}>
            <button className={styles.button} disabled={disabled}>
              {disabled ? 'Carregando...' : 'Fazer login'}
            </button>
          </div>
        </label>
      </form>
    </section>
  );
};

export default SignIn;
