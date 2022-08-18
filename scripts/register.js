import { authRegister } from './api/auth.js';

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await authRegister(registerForm);
  window.location.href = 'login.html';
});
