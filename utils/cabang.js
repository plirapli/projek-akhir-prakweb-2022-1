import { addCabang, deleteCabang, getCabang } from '../controller/cabang.js';

/* API CALL */
// Base URL
const baseURL = 'http://localhost/olive-chicken-delivery/api/user.php?function';

// Get Cabang
const getCabangHandler = () => {
  const tableBody = document.querySelector('.table-user > tbody');

  getCabang().then((data) => {
    const cabangList = data.data;
    let tableElement = '';
    let i = 1;

    cabangList.forEach((cabang) => {
      const element = `
        <tr data-cabang-id = ${cabang.id_cabang}>
          <th scope="row" class="w-table-min">${i++}</th>
          <td>${cabang.cabang}</td>
          <td>${cabang.alamat}</td>
          <td class="w-table-min text-center">
            <span class="text-danger-sub cursor-pointer delete-cabang" data-bs-toggle="modal" data-bs-target="#deleteCabangModal">
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

// Tambah User
const addUser = () => {
  // Ketika btn tambah diklik
  const submitUser = document.querySelector('#addCabangForm');
  submitUser.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputCabang = submitUser.querySelector('#inputCabang').value;
    let inputAlamat = submitUser.querySelector('#inputAlamat').value;

    const newCabang = { cabang: inputCabang, alamat: inputAlamat };

    // Dikirim ke database
    addCabang(newCabang).then((data) => {
      inputCabang = '';
      inputAlamat = '';

      const modalElement = document.querySelector('#inputCabangModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();

      getCabangHandler();
    });
  });
};

// Delete User
const deleteUser = async (id, cabang) => {
  const deleteModal = document.querySelector('#deleteCabangModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus <b>Cabang ${cabang}</b>?`;
  deleteConfirm.addEventListener(
    'click',
    () => {
      deleteCabang(id).then((data) => {
        const modal = bootstrap.Modal.getInstance(deleteModal);
        modal.hide();

        getCabangHandler();
      });
    },
    { once: true }
  );
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
  const deleteBtn = document.querySelectorAll('.delete-cabang');
  deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = delBtn.parentElement.parentElement.dataset.cabangId;
      const cabangName =
        delBtn.parentElement.parentElement.querySelector('td').textContent;

      deleteUser(parseInt(id), cabangName);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getCabangHandler();
  addUserHandler();
});
