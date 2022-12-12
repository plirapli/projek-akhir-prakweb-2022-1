import { URL } from '../config/config.js';
import {
  editUserRole,
  getUserId,
  getUsers,
  getUserTotalByRole,
} from '../controller/user.js';
import { getUserRole } from '../controller/role.js';
import { showFormattedDate } from './convertDate.js';

/* UTILITIES */
const generateObject = (
  nama,
  email,
  username,
  password,
  id_role = 2,
  telp = '',
  created_at = '',
  updated_at = ''
) => {
  return {
    nama,
    email,
    username,
    password,
    telp,
    created_at,
    updated_at,
    id_role,
  };
};

/* API CALL */
// Base URL
const baseURL = `${URL}/api/user.php?function`;

// Get Total User
const getUserTotal = () => {
  const cardInfo = document.querySelector('.card-info');

  getUserTotalByRole().then((data) => {
    const users = data.data;
    let cardElement = '';

    for (const user of users) {
      const { role, total } = user;
      const element = `
        <div class="col-sm">
          <div class="card info-card revenue-card">
            <div class="card-body">
              <h5 class="card-title">${role}</h5>

              <div class="d-flex align-items-center">
                <div class="card-icon bg-gray rounded d-flex align-items-center justify-content-center">
                  <iconify-icon icon="mdi:user"></iconify-icon>
                </div>
                <div class="ps-3">
                  <h6>${total}</h6>
                  <span class="text-muted small">Pengguna</span>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      cardElement += element;
    }
    cardInfo.innerHTML = cardElement;
  });
};

// Get User
const getUser = () => {
  const tableBody = document.querySelector('.table-user > tbody');

  getUsers().then(async ({ data: users }) => {
    let tableElement = '';
    let i = 1;

    for (const user of users) {
      const { id_user, nama, email, username, telepon, id_role, role } = user;
      const created_at = showFormattedDate(user.created_at);
      const updated_at = showFormattedDate(user.updated_at);
      const roleOption = await createStatusEl(id_role).then((data) => data);

      const accordionBody = `
        <tr class="collapse collapse-detail-${id_user}">
          <td></td>
          <td colspan="5" class="py-0">
            <div class="collapse collapse-detail-${id_user}">
              <div class="d-flex align-content-start gap-4">
                <aside class="d-flex gap-4">
                  <div class="d-flex">
                    <div class="d-flex flex-column">
                      <b>Nama</b>
                      <b>Email</b>
                      <b>Username</b>
                      <b>Role</b>
                    </div>
                    <div class="d-flex ms-5 flex-column">
                      <div><span> : </span>${nama}</div>
                      <div><span> : </span>${email || '-'}</div>
                      <div><span> : </span>${username}</div>
                      <div><span> : </span>${role}</div>
                    </div>
                  </div>
                  <div class="d-flex ms-5">
                    <div class="d-flex flex-column">
                      <b>Telepon</b>
                      <b>Dibuat Pada</b>
                      <b>Diperbarui Pada</b>
                    </div>
                    <div class="d-flex ms-5 flex-column">
                      <div><span> : </span>${telepon || '-'}</div>
                      <div><span> : </span>${created_at}</div>
                      <div><span> : </span>${updated_at}</div>
                    </div>
                  </div>
                  <div></div>
                </aside>
              </div>
            </div>
          </td>
        </tr>
      `;

      const element = `
        <tr data-user-id = ${id_user}>
          <th scope="row" class="w-table-min text-center">${i++}</th>
          <td>${nama}</td>
          <td>${username}</td>
          <td class="d-flex justify-content-center">
            ${roleOption}
          </td>
          <td class="w-table-min">
            <span class="d-inline text-btn text-gray cursor-pointer edit-user" data-bs-toggle="modal" data-bs-target="#editUserModal">
              <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
            </span>
            <span class="text-danger-sub cursor-pointer delete-user" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
              <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
            </span>
          </td>
          <td 
            class="w-table-min accordion-header" 
            id="flush-heading-${id_user}"
          >
            <button 
              class="btn btn-gray btn-sm mb-1" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target=".collapse-detail-${id_user}" 
            >
              Detail
            </button>
          </td>
        </tr>
        ${accordionBody}
      `;

      tableElement += element;
    }

    tableBody.innerHTML = tableElement;
    getUserTotal();
    editUserHandler();
    editUserRoleHandler();
    deleteUserHandler();
  });
};

// Get Role
const getRole = () => {
  const selectElement = document.querySelectorAll('.select-role');
  const endpoint = `${URL}/api/role.php?function=get_role`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const roles = data.data;

      selectElement.forEach((selectEl) => {
        let options = `<option value="" hidden selected>Role</option>`;

        roles.forEach((role) => {
          const element = `<option value=${role.id_role} class="text-capitalize">${role.role}</option>`;
          options += element;
        });
        selectEl.innerHTML = options;
      });
    });
};

// Tambah User
const addUser = () => {
  // Ketika btn tambah diklik
  const submitUser = document.querySelector('#addUserForm');
  submitUser.addEventListener('submit', (e) => {
    e.preventDefault();

    const endpoint = `${baseURL}=add_user`;
    let inputNama = submitUser.querySelector('#inputNama').value;
    let inputEmail = submitUser.querySelector('#inputEmail').value;
    let inputUsername = submitUser.querySelector('#inputUsername').value;
    let inputPassword = submitUser.querySelector('#inputPassword').value;
    let selectedRole = submitUser.querySelector('.select-role').value;

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
        selectedRole = '';

        const modalElement = document.querySelector('#inputUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        getUser();
      })
      .catch((err) => console.log(err));
  });
};

// Edit User
const editUser = (id) => {
  const endpointEdit = `${baseURL}=edit_user&id=${id}`;
  const editForm = document.querySelector('#editUserForm');

  getUserId(id)
    .then((data) => {
      const { nama, email, username, password, telepon, id_role } = data.data;

      // Mengambil elemen form
      editForm.querySelector('#editNama').value = nama;
      editForm.querySelector('#editEmail').value = email;
      editForm.querySelector('#editUsername').value = username;
      editForm.querySelector('#editPassword').value = password;
      editForm.querySelector('#editPhoneNumber').value = telepon;
      editForm.querySelector('.select-role').value = id_role;

      editForm.addEventListener(
        'submit',
        async (e) => {
          e.preventDefault();
          const selectedRole = editForm.querySelector('.select-role').value;
          const editedUser = generateObject(
            editForm.querySelector('#editNama').value,
            editForm.querySelector('#editEmail').value,
            editForm.querySelector('#editUsername').value,
            editForm.querySelector('#editPassword').value,
            parseInt(editForm.querySelector('.select-role').value),
            editForm.querySelector('#editPhoneNumber').value
          );

          // Dikirim ke database
          fetch(endpointEdit, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              const modalElement = document.querySelector('#editUserModal');
              const modal = bootstrap.Modal.getInstance(modalElement);
              modal.hide();

              getUser();
            })
            .catch((err) => console.log(err));
        },
        { once: true }
      );
    })
    .catch((err) => console.log(err));
};

// Delete User
const deleteUser = async (id, nama) => {
  const endpoint = `${baseURL}=delete_user&id=${id}`;
  const deleteModal = document.querySelector('#deleteUserModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus user bernama <b>${nama}</b>?`;
  deleteConfirm.addEventListener(
    'click',
    () => {
      fetch(endpoint, { method: 'DELETE' })
        .then((res) => res.json())
        .then((data) => {
          const modalElement = document.querySelector('#deleteUserModal');
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();

          getUser();
        })
        .catch((err) => console.log('Error: ' + err));
    },
    { once: true }
  );
};

/* END API CALL */

// Add User Handler
const addUserHandler = () => {
  const addBtn = document.querySelector('#addUserBtn');
  addBtn.addEventListener('click', () => {
    addUser();
  });
};

// Edit User Handler
const editUserHandler = () => {
  const editBtn = document.querySelectorAll('.edit-user');
  editBtn.forEach((edit) => {
    edit.addEventListener('click', () => {
      const id = edit.parentElement.parentElement.dataset.userId;
      editUser(parseInt(id));
    });
  });
};

// Create User Role Options
const createStatusEl = async (id = '0') => {
  return getUserRole().then(({ data: roles }) => {
    let selectOption = '';

    for (const role of roles) {
      const { id_role, role: roleName } = role;
      selectOption += `
        <option value=${id_role} ${id_role == id ? 'selected' : ''}>
          ${roleName}
        </option>`;
    }

    return `
      <select style="width: 7.5rem" class="form-select select-role" aria-label="Select Option for User Role">
        ${selectOption}
      </select>
    `;
  });
};

// Edit User Role Handler
const editUserRoleHandler = () => {
  const selectButtons = document.querySelectorAll('.select-role');
  for (const selectBtn of selectButtons) {
    selectBtn.addEventListener('change', (e) => {
      const user = parseInt(
        selectBtn.parentElement.parentElement.dataset.userId
      );
      const role = parseInt(e.target.value);
      editUserRole(user, role).then(() => getUserTotal());
    });
  }
};

// Delete User Handler
const deleteUserHandler = () => {
  const deleteBtn = document.querySelectorAll('.delete-user');
  deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = delBtn.parentElement.parentElement.dataset.userId;
      const name =
        delBtn.parentElement.parentElement.querySelector('td').textContent;

      deleteUser(parseInt(id), name);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getUser();
  getRole();
  addUserHandler();
});
