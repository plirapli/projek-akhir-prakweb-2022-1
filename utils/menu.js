import { rootURL } from '../config/config.js';
import * as controllerMenu from '../controller/menu.js';
import { showFormattedCurrency } from './convertDate.js';

/* API CALL */
// Get Menu
const getMenu = () => {
  const menuList = document.querySelector('#menuList');
  const pathMenuImg = `/${rootURL}/assets/img/menu`;

  controllerMenu.getMenu().then((data) => {
    const menus = data.data;
    let menuElement = '';

    menus.forEach((menu) => {
      const element = `
        <div class="card card-menu-makanan" data-menu-id=${menu.id_menu}>
          <img style="height: 20rem; object-fit: cover;" src=${pathMenuImg}/${
        menu.img_menu
      } class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${menu.menu}</h5>
            <p class="card-text">
              ${menu.deskripsi}
            </p>
          </div>
          
          <ul class="list-group list-group-flush border-0">
            <li class="list-group-item d-flex justify-content-between align-items-center ${
              menu.stok > 0 ? '' : 'text-danger'
            }">
              <div class="d-flex align-items-center gap-2">
                <iconify-icon icon="mdi:box-outline" width="20"></iconify-icon>
                Stok
              </div>
              <b class="stok">
                ${menu.stok}
              </b>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-2">
                <iconify-icon icon="akar-icons:money" width="20"></iconify-icon>
                Harga
              </div>
              <span class="fw-bold">
                Rp<span class="harga">${showFormattedCurrency(
                  menu.harga
                )}</span>
              </span>
            </li>
            <li class="list-group-item py-3 d-flex">
              <button 
                class="btn btn-secondary edit-menu w-100" 
                data-bs-toggle="modal" 
                data-bs-target="#editMenuModal"
              >
                Edit
              </button>
              <button 
                class="ms-1 btn btn-danger-sub delete-menu d-flex align-items-center p-2" 
                data-bs-toggle="modal" 
                data-bs-target="#deleteMenuModal"
              >
                <iconify-icon icon="material-symbols:delete" width="24"></iconify-icon>
              </button>
            </li>
          </ul>
        </div>
      `;

      menuElement += element;
    });

    menuList.innerHTML = menuElement;
    editMenuHandler();
    deleteMenuHandler();
  });
};

// Edit Menu
const editMenu = (id) => {
  const editForm = document.querySelector('#editMenuForm');

  controllerMenu.getMenuId(id).then((data) => {
    const { menu, deskripsi, stok, harga } = data.data;

    // Mengambil elemen form
    editForm.action = `../api/menu.php?function=edit_menu&id=${id}`;
    editForm.querySelector('#editMenu').value = menu;
    editForm.querySelector('#editDeskripsi').value = deskripsi;
    editForm.querySelector('#editStok').value = stok;
    editForm.querySelector('#editHarga').value = harga;
  });
};

// Delete Menu
const deleteMenu = (id, menu) => {
  const deleteModal = document.querySelector('#deleteMenuModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus menu <b>${menu}</b>?`;
  deleteConfirm.addEventListener(
    'click',
    () => {
      window.location.replace(`../api/menu.php?function=delete_menu&id=${id}`);
    },
    { once: true }
  );
};

/* END API CALL */

// Edit Handler
const editMenuHandler = () => {
  const editBtn = document.querySelectorAll('.edit-menu');
  editBtn.forEach((edit) => {
    edit.addEventListener('click', () => {
      const id = edit.parentElement.parentElement.parentElement.dataset.menuId;
      editMenu(parseInt(id));
    });
  });
};

// Delete Handler
const deleteMenuHandler = () => {
  const deleteBtn = document.querySelectorAll('.delete-menu');
  deleteBtn.forEach((delBtn) => {
    delBtn.addEventListener(
      'click',
      () => {
        const id =
          delBtn.parentElement.parentElement.parentElement.dataset.menuId;
        const menuName =
          delBtn.parentElement.parentElement.parentElement.querySelector(
            '.card-title'
          ).textContent;

        deleteMenu(parseInt(id), menuName);
      },
      { once: true }
    );
  });
};

const messageHandler = () => {
  const msgElement = document.querySelector('#msgHandler');
  const closeBtn = msgElement?.querySelector('button');

  if (closeBtn) {
    closeBtn.addEventListener(
      'click',
      () => (msgElement.style.display = 'none'),
      { once: true }
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getMenu();
  messageHandler();
});
