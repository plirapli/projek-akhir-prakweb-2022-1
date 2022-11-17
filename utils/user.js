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
      let i = 1;

      users.forEach((user) => {
        const element = `
          <tr data-user-id = ${user.id_user}>
            <th scope="row">${i++}</th>
            <td>${user.nama}</td>
            <td>${user.username}</td>
            <td class="text-capitalize">${user.role}</td>
            <td>
              <span class="text-gray cursor-pointer">
                <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
              </span>
              <span class="text-danger-sub cursor-pointer delete-user" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
              </span>
            </td>
          </tr>
        `;

        tableElement += element;
      });

      tableBody.innerHTML = tableElement;
      deleteUserHandler();
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

          const modalElement = document.querySelector('#inputUserModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();

          getUser();
        })
        .catch((err) => console.log(err));
    }
  });
};

// Delete User
const deleteUser = (id) => {
  const endpoint = `${baseURL}/user.php?function=delete_user&id=${id}`;
  const deleteModal = document.querySelector('#deleteUserModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus user bernama ${id}?`;
  deleteConfirm.addEventListener('click', () => {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        const modalElement = document.querySelector('#deleteUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        console.log(data);
        getUser();
      })
      .catch((err) => console.log('Error: ' + err));
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

// Delete Handler
const deleteUserHandler = () => {
  const deleteBtn = document.querySelectorAll('.delete-user');
  deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = delBtn.parentElement.parentElement.dataset.userId;
      deleteUser(parseInt(id));
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getUser();
  addUserHandler();
});
