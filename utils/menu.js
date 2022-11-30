import * as controllerMenu from '../controller/menu.js';

/* API CALL */
// Get Menu
const getMenu = () => {
  const menuList = document.querySelector('#menuList');
  const pathMenuImg = '/olive-chicken/assets/img/menu';

  controllerMenu.getMenu().then((data) => {
    const menus = data.data;
    let menuElement = '';

    menus.forEach((menu) => {
      const element = `
        <div class="card card-menu-makanan" data-menu-id=${menu.id_menu}>
          <img style="height: 20rem; object-fit: cover;" src=${pathMenuImg}/${menu.img_menu} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${menu.menu}</h5>
            <p class="card-text">
              ${menu.deskripsi}
            </p>
          </div>
          <ul class="list-group list-group-flush border-0">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>Stok</span>
              <b>${menu.stok}</b>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Harga
              <span>
                Rp
                <b class="harga">${menu.harga}</b>
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
    editForm.querySelector('#editMenu').value = menu;
    editForm.querySelector('#editDeskripsi').value = deskripsi;
    editForm.querySelector('#editStok').value = stok;
    editForm.querySelector('#editHarga').value = harga;

    editForm.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        const editedUser = {
          id: id,
          menu: editForm.querySelector('#editMenu').value,
          desc: editForm.querySelector('#editDeskripsi').value,
          stok: editForm.querySelector('#editStok').value,
          harga: editForm.querySelector('#editHarga').value,
        };

        // Dikirim ke database
        controllerMenu
          .editMenu(editedUser)
          .then((data) => {
            const modalElement = document.querySelector('#editMenuModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            getMenu();
          })
          .catch((err) => console.log(err));
      },
      { once: true }
    );
  });
};

// Delete Menu
const deleteMenu = async (id, menu) => {
  const deleteModal = document.querySelector('#deleteMenuModal');
  const modalBody = deleteModal.querySelector('.modal-body');
  const deleteConfirm = deleteModal.querySelector('.btn-delete');

  modalBody.innerHTML = `Apakah anda ingin menghapus menu <b>${menu}</b>?`;
  deleteConfirm.addEventListener(
    'click',
    () => {
      controllerMenu.deleteMenu(id).then((data) => {
        const modal = bootstrap.Modal.getInstance(deleteModal);
        modal.hide();
        getMenu();
      });
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

document.addEventListener('DOMContentLoaded', () => {
  getMenu();
});
