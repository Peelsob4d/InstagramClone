import { fetchServer } from '../utils/fetchs.js';
import { tokenJWT } from '../utils/tokens.js';

const { getToken } = tokenJWT();

const createNewPost = (forms) => {
  return fetchServer(
    'posts/post',
    'POST',
    { Authorization: getToken() },
    new FormData(forms),
  );
};

const getMyPost = async () => {
  return fetchServer('posts/', 'GET', { Authorization: getToken() }).then(
    (res) => res.json(),
  );
};

export { createNewPost, getMyPost };
