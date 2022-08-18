import { authLogin } from './api/auth.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await authLogin(loginForm);
  window.location.href = 'index.html';
});
