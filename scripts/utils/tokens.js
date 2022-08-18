const localStorage = window.localStorage;

const tokenJWT = () => {
  const setToken = (token) => {
    localStorage.setItem('jwt', token);
  };
  const getToken = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return 'Have no token';
    return token;
  };
  return { setToken, getToken };
};
export { tokenJWT };
