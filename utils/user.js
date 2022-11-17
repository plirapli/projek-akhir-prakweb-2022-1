/* UTILITIES */
const generateObject = (
  nama,
  email,
  username,
  password,
  id_role = '2',
  telepon = '',
  created_at = '',
  updated_at = ''
) => {
  return {
    nama,
    email,
    username,
    password,
    id_role,
    telepon,
    created_at,
    updated_at,
  };
};

/* API CALL */
// Base URL
const baseURL = 'http://localhost/olive-chicken-delivery/api';

// Get User
const getUser = () => {
  const tableBody = document.querySelector('.table-user > tbody');
  const endpoint = `${baseURL}/user.php?function=get_user`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const users = data.data;
      let tableElement = '';

      users.forEach((user) => {
        const element = `
          <tr data-user-id = ${user.id}>
            <th scope="row">1</th>
            <td>${user.nama}</td>
            <td>${user.username}</td>
            <td>${user.id_role}</td>
            <td>
              <a href="#" class="text-gray">
                <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
              </a>
              <a href="#" class="text-danger-sub">
                <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
              </a>
            </td>
          </tr>
        `;

        tableElement += element;
      });

      tableBody.innerHTML = tableElement;
    });
};

// Get Role
const getRole = () => {
  const selectRole = document.querySelector('#selectRole');
  const endpoint = `${baseURL}/role.php?function=get_role`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const roles = data.data;
      let options = `<option value="" hidden selected>Role</option>`;

      roles.forEach((role) => {
        const element = `<option value=${role.id} class="text-capitalize">${role.role}</option>`;
        options += element;
      });

      selectRole.innerHTML = options;
    });
};

// Tambah User
const addUser = () => {
  getRole();

  // Ketika btn tambah diklik
  const submitUser = document.querySelector('#addUserForm');
  submitUser.addEventListener('submit', (e) => {
    e.preventDefault();

    let endpoint = `${baseURL}/user.php?function=add_user`;
    let inputNama = submitUser.querySelector('#inputNama').value;
    let inputEmail = submitUser.querySelector('#inputEmail').value;
    let inputUsername = submitUser.querySelector('#inputUsername').value;
    let inputPassword = submitUser.querySelector('#inputPassword').value;
    let inputConfirmPassword = submitUser.querySelector(
      '#inputConfirmPassword'
    ).value;
    let selectedRole = document.querySelector('#selectRole').value;

    if (inputPassword == inputConfirmPassword) {
      const newUsers = generateObject(
        inputNama,
        inputEmail,
        inputUsername,
        inputPassword,
        parseInt(selectedRole)
      );

      // Dikirim ke database
      fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUsers),
      })
        .then((res) => res.json())
        .then((data) => {
          inputNama = '';
          inputEmail = '';
          inputUsername = '';
          inputPassword = '';
          inputConfirmPassword = '';
          selectedRole = '';

          const myModalEl = document.querySelector('#inputUserModal');
          const modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();

          console.log(data);
          getUser();
        })
        .catch((err) => console.log(err));
    }
  });
};

/* END API CALL */

// Add Handler
const addUserHandler = () => {
  const addBtn = document.querySelector('#addUserBtn');
  addBtn.addEventListener('click', () => {
    addUser();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getUser();
  addUserHandler();
});
