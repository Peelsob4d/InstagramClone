import { fetchServer, formDataParser } from '../utils/fetchs.js';
import { tokenJWT } from '../utils/tokens.js';

const authRegister = async (forms) => {
  const formData = formDataParser(forms);
  const res = await fetchServer(
    'auth/register',
    'POST',
    { 'Content-Type': 'application/json' },
    formData,
  );
  return res;
};

const authLogin = async (forms) => {
  const formData = formDataParser(forms);
  const { setToken, getToken } = tokenJWT();
  try {
    const res = await fetchServer(
      'auth/login',
      'POST',
      { 'Content-Type': 'application/json' },
      formData,
    ).then((res) => res.json());
    setToken(res);
    console.log(getToken());
    return;
  } catch (e) {
    return e;
  }
};

export { authRegister, authLogin };
