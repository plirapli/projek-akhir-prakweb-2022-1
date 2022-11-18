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
        const accordionBody = `
          <tr class="collapse collapse-detail-${user.id_user}">
            <td></td>
            <td colspan="5" class="py-0">
              <div class="collapse collapse-detail-${user.id_user}">
                <div class="d-flex align-content-start gap-4">
                  <img
                    class="img-detail"
                    src="../assets/img/profile-default.png"
                    alt=""
                  />
                  <aside class="d-flex gap-4">
                    <div class="d-flex">
                      <div class="d-flex flex-column">
                        <b>Nama</b>
                        <b>Email</b>
                        <b>Username</b>
                        <b>Role</b>
                      </div>
                      <div class="d-flex ms-5 flex-column">
                        <div><span> : </span>${user.nama}</div>
                        <div><span> : </span>${user?.email || '-'}</div>
                        <div><span> : </span>${user.username}</div>
                        <div><span> : </span>${user.role}</div>
                      </div>
                    </div>
                    <div class="d-flex ms-5">
                      <div class="d-flex flex-column">
                        <b>Telepon</b>
                        <b>Dibuat Pada</b>
                        <b>Diperbarui Pada</b>
                      </div>
                      <div class="d-flex ms-5 flex-column">
                        <div><span> : </span>${user.telepon || '-'}</div>
                        <div><span> : </span>${user.created_at}</div>
                        <div><span> : </span>${user.updated_at}</div>
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
          <tr data-user-id = ${user.id_user}>
            <th scope="row" class="w-table-min">${i++}</th>
            <td>${user.nama}</td>
            <td>${user.username}</td>
            <td class="text-capitalize">${user.role}</td>
            <td class="w-table-min">
              <span class="d-inline text-gray cursor-pointer edit-user" data-bs-toggle="modal" data-bs-target="#editUserModal">
                <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
              </span>
              <span class="text-danger-sub cursor-pointer delete-user" data-bs-toggle="modal" data-bs-target="#deleteUserModal">
                <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
              </span>
            </td>
            <td 
              class="w-table-min accordion-header" 
              id="flush-heading-${user.id_user}"
            >
              <button 
                class="btn btn-gray btn-sm mb-1" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target=".collapse-detail-${user.id_user}" 
              >
                Detail
              </button>
            </td>
          </tr>
          ${accordionBody}
        `;

        tableElement += element;
      });

      tableBody.innerHTML = tableElement;
      editUserHandler();
      deleteUserHandler();
    });
};

// Get Role
const getRole = () => {
  const selectElement = document.querySelectorAll('.select-role');
  const endpoint = `${baseURL}/role.php?function=get_role`;

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

// Edit User
const editUser = (id) => {
  const endpoint = `${baseURL}/user.php?function=get_user_id&id=${id}`;
  const editModal = document.querySelector('#editUserModal');
  const editForm = document.querySelector('#editUserForm');

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const { nama, email, username, password, img_profile, telepon, id_role } =
        data.data;

      // Mengambil elemen form
      editForm.querySelector('#editNama').value = nama;
      editForm.querySelector('#editEmail').value = email;
      editForm.querySelector('#editUsername').value = username;
      editForm.querySelector('#editPassword').value = password;
      editForm.querySelector('#editPhoneNumber').value = telepon;
      editForm.querySelector('.select-role').value = id_role;
    })
    .catch((err) => console.log(err));
  // const deleteConfirm = deleteModal.querySelector('.btn-delete');
};

// Delete User
const deleteUser = (id, nama) => {
  const endpoint = `${baseURL}/user.php?function=delete_user&id=${id}`;
  const deleteModal = document.querySelector('#deleteUserModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus user bernama <b>${nama}</b>?`;
  deleteConfirm.addEventListener('click', () => {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        const modalElement = document.querySelector('#deleteUserModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

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

// Edit Handler
const editUserHandler = () => {
  const editBtn = document.querySelectorAll('.edit-user');
  editBtn.forEach((edit) => {
    edit.addEventListener('click', () => {
      const id = edit.parentElement.parentElement.dataset.userId;
      editUser(parseInt(id));
    });
  });
};

// Delete Handler
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
