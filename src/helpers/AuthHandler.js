// npm install js-cookie --save;
import Cookies from 'js-cookie';

export const isLogged = () => {
  let token = Cookies.get('token');
  return token ? true : false;
};

export const doLogin = (token, rememberPassword = false) => {
  // caso rememberPassword for true, ele irá salvar a senha nos cookies, caso for falso, ele não irá salvar as senhas nos cookies. Se salvar, irá demorar 9999 dias para expirar a salvação das senhas;
  if (rememberPassword) {
    Cookies.set('token', token, { expires: 9999 });
  } else {
    Cookies.set('token', token);
  }
};
