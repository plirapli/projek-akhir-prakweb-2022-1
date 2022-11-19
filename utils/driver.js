import { getDriverId } from '../controller/driver.js';
import { showFormattedDate } from './convertDate.js';

/* UTILITIES */
const generateObject = (
  nama,
  email,
  username,
  password,
  id_role = 2,
  img_profile = '',
  telp = '',
  created_at = '',
  updated_at = ''
) => {
  return {
    nama,
    email,
    username,
    password,
    img_profile,
    telp,
    created_at,
    updated_at,
    id_role,
  };
};

/* API CALL */
// Base URL
const baseURL = 'http://localhost/olive-chicken-delivery/api';

// Get Status
const getStatus = async () => {
  const endpoint = `${baseURL}/status.php?function=get_status`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

// Get User
const getUser = () => {
  const endpoint = `${baseURL}/driver.php?function=get_user`;
  const tableBody = document.querySelector('.table-driver > tbody');

  fetch(endpoint)
    .then((response) => response.json())
    .then(async (data) => {
      const users = data.data;
      let tableElement = '';
      let i = 1;

      for (const user of users) {
        const created_at = showFormattedDate(user.created_at);
        const updated_at = showFormattedDate(user.updated_at);
        const statusOption = await createStatusElement(user.id_status).then(
          (data) => data
        );

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
                        <b>Status</b>
                      </div>
                      <div class="d-flex ms-2 flex-column">
                        <div><span> : </span>${user.nama}</div>
                        <div><span> : </span>${user?.email || '-'}</div>
                        <div><span> : </span>${user.username}</div>
                        <div><span> : </span>${user?.status || 'Tersedia'}</div>
                      </div>
                    </div>
                    <div class="d-flex ms-2">
                      <div class="d-flex flex-column">
                        <b>Telepon</b>
                        <b>Dibuat Pada</b>
                        <b>Diperbarui Pada</b>
                      </div>
                      <div class="d-flex ms-5 flex-column">
                        <div><span> : </span>${user?.telepon || '-'}</div>
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
          <tr data-user-id = ${user.id_user}>
            <th scope="row" class="w-table-min">${i++}</th>
            <td>${user.nama}</td>
            <td>${user.username}</td>
            <td>
              ${statusOption}
            </td>
            <td>${user.jarak} km</td>
            <td>
              <span>Rp</span>
              ${user.penghasilan}
            </td>
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
      }

      tableBody.innerHTML = tableElement;

      editStatusHandler();
      editUserHandler();
      deleteUserHandler();
    });
};

// Edit Status
const editStatus = (id, status) => {
  const endpoint = `${baseURL}/status.php?function=edit_status_driver&id=${id}`;
  fetch(endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_status: status }),
  })
    .then((res) => res.json())
    .then((data) => getUser())
    .catch((err) => console.log(err));
};

// Edit User
const editUser = (id) => {
  const endpointEdit = `${baseURL}/user.php?function=edit_user&id=${id}`;
  const endpointGetId = `${baseURL}/user.php?function=get_user_id&id=${id}`;
  const editForm = document.querySelector('#editUserForm');

  fetch(endpointGetId)
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

      editForm.addEventListener(
        'submit',
        (e) => {
          e.preventDefault();
          const editedUser = generateObject(
            editForm.querySelector('#editNama').value,
            editForm.querySelector('#editEmail').value,
            editForm.querySelector('#editUsername').value,
            editForm.querySelector('#editPassword').value,
            3,
            '',
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
const deleteUser = (id, nama) => {
  const endpoint = `${baseURL}=delete_user&id=${id}`;
  const deleteModal = document.querySelector('#deleteUserModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus user bernama <b>${nama}</b>?`;
  deleteConfirm.addEventListener(
    'click',
    () => {
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
    },
    { once: true }
  );
};

/* END API CALL */

const createStatusElement = async (id_status = '1') => {
  return getStatus().then((data) => {
    const statusList = data.data;
    let selectOption = '';

    statusList.forEach((status) => {
      const { id_status: id, status: name } = status;
      selectOption += `<option value=${id} ${id_status == id ? 'selected' : ''}>
          ${name}
        </option>`;
    });

    return `
      <select class="form-select select-status" aria-label="Default select example">
        ${selectOption}
      </select>
    `;
  });
};

const editStatusHandler = () => {
  const selectBtn = document.querySelectorAll('.select-status');
  selectBtn.forEach((select) => {
    select.addEventListener('change', (e) => {
      const id = parseInt(select.parentElement.parentElement.dataset.userId);
      const status = parseInt(e.target.value);
      editStatus(id, status);
    });
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
});
