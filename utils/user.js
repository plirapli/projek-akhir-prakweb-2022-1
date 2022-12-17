import {
  addUser,
  deleteUser,
  editUser,
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
  id_role,
  telp = ''
) => {
  return {
    nama,
    email,
    username,
    password,
    id_role,
    telp,
  };
};

// Get Total User
const getUserTotalHandler = () => {
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
const getUserHandler = () => {
  const tableBody = document.querySelector('.table-user > tbody');

  getUsers().then(async ({ data: users }) => {
    let tableElement = '';
    let i = 1;

    for (const user of users) {
      const { id_user, nama, email, username, telepon, id_role, role } = user;
      const created_at = showFormattedDate(user.created_at);
      const updated_at = showFormattedDate(user.updated_at);
      const roleOption = await createRoleElement(id_role).then((data) => data);

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
          <td class="w-table-min px-0">
            <button class="btn d-flex align-items-center p-1 text-gray edit-user" data-bs-toggle="modal" data-bs-target="#editUserModal">
              <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
            </button>
          </td>
          <td class="w-table-min px-0">
            <button class="btn d-flex align-items-center p-1 text-danger-sub delete-user" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
              <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
            </button>
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
    getUserTotalHandler();
    editDeleteUserHandler();
    editUserRoleHandler();
  });
};

// Add User Handler
const addUserHandler = () => {
  const addBtn = document.querySelector('#addUserBtn');
  addBtn.addEventListener(
    'click',
    () => {
      const submitBtn = document.querySelector('#addUserForm');

      submitBtn.addEventListener(
        'submit',
        (e) => {
          e.preventDefault();

          let inputNama = submitBtn.querySelector('#inputNama');
          let inputEmail = submitBtn.querySelector('#inputEmail');
          let inputUsername = submitBtn.querySelector('#inputUsername');
          let inputPassword = submitBtn.querySelector('#inputPassword');
          let selectedRole = submitBtn.querySelector('.select-role');

          const newUsers = generateObject(
            inputNama.value,
            inputEmail.value,
            inputUsername.value,
            inputPassword.value,
            parseInt(selectedRole.value)
          );

          // Dikirim ke database
          addUser(newUsers)
            .then(({ status }) => {
              if (status) {
                inputNama.value = '';
                inputEmail.value = '';
                inputUsername.value = '';
                inputPassword.value = '';
                selectedRole.value = '';

                const modalElement = document.querySelector('#inputUserModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                getUserHandler();
              }
            })
            .catch((err) => console.log(err));
        },
        { once: true }
      );
    },
    { once: true }
  );
};

// Edit User Handler
const editDeleteUserHandler = () => {
  const userRows = document.querySelectorAll('tr[data-user-id]');

  for (const userRow of userRows) {
    const userID = userRow.dataset.userId;
    const editBtn = userRow.querySelector('.edit-user');
    const delBtn = userRow.querySelector('.delete-user');

    // Edit user handler
    editBtn.addEventListener('click', () => {
      const editForm = document.querySelector('#editUserForm');
      editForm.setAttribute('data-user-id', userID);

      getUserId(userID)
        .then(({ data: user }) => {
          const { nama, email, username, password, telepon, id_role } = user;

          // Mengambil elemen form
          let editNama = editForm.querySelector('#editNama');
          let editEmail = editForm.querySelector('#editEmail');
          let editUsername = editForm.querySelector('#editUsername');
          let editPasswd = editForm.querySelector('#editPassword');
          let editRole = editForm.querySelector('.select-role');
          let editPhoneNum = editForm.querySelector('#editPhoneNumber');

          editNama.value = nama;
          editEmail.value = email;
          editUsername.value = username;
          editPasswd.value = password;
          editRole.value = id_role;
          editPhoneNum.value = telepon;

          editForm.addEventListener(
            'submit',
            (e) => {
              e.preventDefault();

              if (editForm.dataset.userId == userID) {
                const editedUser = generateObject(
                  editNama.value,
                  editEmail.value,
                  editUsername.value,
                  editPasswd.value,
                  editRole.value,
                  editPhoneNum.value
                );

                // Dikirim ke database
                editUser(userID, editedUser)
                  .then(({ status }) => {
                    if (status) {
                      const modalElement =
                        document.querySelector('#editUserModal');
                      const modal = bootstrap.Modal.getInstance(modalElement);
                      modal.hide();

                      getUserHandler();
                    }
                  })
                  .catch((err) => console.log(err));
              }
            },
            { once: true }
          );
        })
        .catch((err) => console.log(err));
    });

    // Delete user handler
    delBtn.addEventListener('click', () => {
      const name = userRow.querySelector('td').textContent;

      const deleteModal = document.querySelector('#deleteUserModal');
      const modalBody = deleteModal.querySelector('.modal-body');
      const deleteConfirm = deleteModal.querySelector('.btn-delete');

      deleteModal.setAttribute('data-user-id', userID);
      modalBody.innerHTML = `Apakah anda ingin menghapus user bernama <b>${name}</b>?`;

      deleteConfirm.addEventListener(
        'click',
        () => {
          if (deleteModal.dataset.userId == userID) {
            deleteUser(userID)
              .then(() => {
                const modalElement = document.querySelector('#deleteUserModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

                getUserHandler();
              })
              .catch((err) => console.log('Error: ' + err));
          }
        },
        { once: true }
      );
    });
  }
};

// Create User Role Options
const createRoleElement = async (id = '0') => {
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

// Create User Role Options on Modal
const createRoleElementOnModal = () => {
  const formSelectElement = document.querySelectorAll('form .select-role');
  getUserRole().then(({ data: roles }) => {
    for (const formSelectEl of formSelectElement) {
      let options = `<option value="" hidden selected>Role</option>`;
      for (const role of roles) {
        const { id_role, role: roleName } = role;
        options += `
          <option value=${id_role} class="text-capitalize">
            ${roleName}
          </option>`;
      }
      formSelectEl.innerHTML = options;
    }
  });
};

// Edit User Role Handler
const editUserRoleHandler = () => {
  const selectButtons = document.querySelectorAll('td .select-role');
  for (const selectBtn of selectButtons) {
    selectBtn.addEventListener('change', (e) => {
      const user = parseInt(
        selectBtn.parentElement.parentElement.dataset.userId
      );
      const role = parseInt(e.target.value);
      editUserRole(user, role).then(() => {
        getUserHandler();
        getUserTotalHandler();
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getUserHandler();
  addUserHandler();
  createRoleElementOnModal();
});
