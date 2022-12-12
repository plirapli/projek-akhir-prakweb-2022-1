const loginRegisterBtnHandler = () => {
  const inputForms = document.querySelectorAll('.inputForm');
  const loginForm = document.querySelector('#loginForm');
  const registerForm = document.querySelector('#registerForm');
  const headerTitle = document.querySelector('#headerTitle');
  let isLoginPage = true;

  for (const inputForm of inputForms) {
    const changeBtn = inputForm.querySelector('a');
    changeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      loginForm.classList.toggle('d-none');
      registerForm.classList.toggle('d-none');
      isLoginPage = !isLoginPage;

      headerTitle.innerHTML = isLoginPage ? 'LOGIN' : 'REGISTER';
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loginRegisterBtnHandler();
});
