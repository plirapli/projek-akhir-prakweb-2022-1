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
      let options = '<option value="" hidden selected>Role</option>';

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
  // ... ntar aja ngantuk
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
