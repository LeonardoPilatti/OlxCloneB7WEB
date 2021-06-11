import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://alunos.b7web.com.br:501';

// const método POST
const apiFetchPost = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const response = await fetch(BASEAPI + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();

  if (json.notallowed) {
    /// se tentar fazer algo que não pode ou que não existe
    window.location.href = '/signin';
    return;
  }

  return json;
};

/// const método GET
const apiFetchGet = async (endpoint, body = []) => {
  if (!body.token) {
    let token = Cookies.get('token');
    if (token) {
      body.token = token;
    }
  }

  const response = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);
  const json = await response.json();

  if (json.notallowed) {
    /// se tentar fazer algo que não pode ou que não existe ou que nao tem permissao
    window.location.href = '/signin';
    return;
  }

  return json;
};

const OlxAPI = {
  login: async (email, password) => {
    // fazer consulta ao WebService
    const json = await apiFetchPost('/user/signin', { email, password });
    return json;
  },

  register: async (name, email, password, stateLoc) => {
    const json = await apiFetchPost('/user/signup', {
      name,
      email,
      password,
      state: stateLoc,
    });
    return json;
  },

  getStates: async () => {
    const json = await apiFetchGet('/states');
    return json.states;
  },

  getCategories: async () => {
    const json = await apiFetchGet('/categories');
    return json.categories;
  },

  getAds: async (options) => {
    const json = await apiFetchGet('/ad/list', options);
    return json;
  },

  getAd: async (id, other = false) => {
    const json = await apiFetchGet('/ad/item', {
      id,
      other,
    });
    return json;
  },
};

export default () => OlxAPI;
