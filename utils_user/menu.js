import * as controllerMenu from '../controller/menu.js';
import { addOrder, addTransaction } from '../controller/order.js';
import { getUserId, getUsers } from '../controller/user.js';

// Global Variable
const CartMenus = [];

// Get User by ID
const getUserByID = () => {
  const id = document.querySelector('body').dataset.idUser;
  const infoElement = document.querySelector('.customer-info');

  getUserId(id).then((data) => {
    const user = data.data;
    infoElement.innerHTML = `
      <h5>Informasi Pelanggan</h5>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <div>Nama</div>
          <div>Email</div>
          <div>Telepon</div>
        </div>
        <div class="d-flex ms-5 flex-column">
          <div class="fw-bold"><span class="fw-normal"> : </span>${
            user?.nama
          }</div>
          <div class="fw-bold"><span class="fw-normal"> : </span>${
            user?.email || '-'
          }</div>
          <div class="fw-bold"><span class="fw-normal"> : </span>${
            user?.telepon || '-'
          }</div>
        </div>
      </div>
    `;
  });
};

// Get Menu
const getMenu = () => {
  const menuList = document.querySelector('#menuList');
  const pathMenuImg = '/olive-chicken-delivery/assets/img/menu';

  controllerMenu.getMenu().then((data) => {
    const menus = data.data;
    let menuElement = '';

    menus.forEach((menu) => {
      const element = `
        <div class="card card-menu-makanan mb-0 shadow" data-menu-id=${
          menu.id_menu
        } data-stok=${menu.stok}>
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
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Stok
              <b class="harga">${menu.stok}</b>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Harga
              <span>
                Rp
                <b class="harga">${menu.harga}</b>
              </span>
            </li>
            <li class="list-group-item py-3">
              <button class="w-100 btn btn-primary add-to-cart" ${
                menu.stok == 0 ? 'disabled' : ''
              }>
                Tambah
              </button>
              <div class="w-100 flex-column gap-2 qty-btn" style="display: none;">
                <div class="w-100 d-flex gap-2">
                  <button class="btn btn-primary qty-min"> - </button>
                  <input 
                    type="number" 
                    id="inputQty" 
                    class="w-100 form-control" 
                    readonly
                  >
                  <button class="btn btn-primary qty-plus"> + </button>
                </div>
                <button class="w-100 btn btn-sm btn-gray delete-cart"> Hapus </button>
              </div>
            </li>
          </ul>
        </div>
      `;

      menuElement += element;
    });

    menuList.innerHTML = menuElement;
    addCartHandler();
  });
};

/* CART PROCESS */
const RENDER_EVENT = 'render-cart';

document.addEventListener(RENDER_EVENT, async () => {
  const pathMenuImg = '/olive-chicken-delivery/assets/img/menu';

  const cartList = document.getElementById('shoppingCart');
  const cartTotal = document.getElementById('cartTotal');
  cartList.innerHTML = '';

  let cartElement = '';
  let total = 0;

  for (const cartMenu of CartMenus) {
    const { id, qty } = cartMenu;
    const { menu, img_menu, harga } = await controllerMenu
      .getMenuId(id)
      .then((data) => data.data);

    const subtotal = harga * qty;
    const element = `
      <div 
        class="card-cart bg-gray p-4 rounded-3 d-flex gap-3 align-items-center mt-3" 
        data-menu-id=${id}
      >
        <img 
          src=${pathMenuImg}/${img_menu} 
          style="width: 4rem; height: 4rem" 
          class="bg-black rounded-3"
        >
        <div class="w-100 d-flex align-items-center gap-3">
          <div class="w-100">
          <div>
            <span class="fw-bold">
              ${menu} 
            </span>
            (Rp${harga})
            </div>
            <div class="text-gray">
              Qty: <span class="text-black">${qty}</span>
            </div>
          </div>
          <div style="font-weight: 500;">
            Rp<span>${subtotal}</span>
          </div>
        </div>
      </div>`;

    total += subtotal;
    cartElement += element;
  }

  cartTotal.innerHTML = total;
  cartList.innerHTML = cartElement;
});

const addCartHandler = () => {
  const addCartBtn = document.querySelectorAll('.add-to-cart');
  addCartBtn.forEach((addCart) => {
    const card = addCart.parentElement.parentElement.parentElement;
    const id = card.dataset.menuId;
    const stok = card.dataset.stok;
    const qtyBtn = card.querySelector('.qty-btn');
    const deleteCartBtn = card.querySelector('.delete-cart');

    addCart.addEventListener('click', () => {
      const newMenu = { id, qty: 1 };

      addCart.style.display = 'none';
      qtyBtn.style.display = 'flex';

      CartMenus.push(newMenu);
      document.querySelector(`[data-menu-id="${id}"] #inputQty`).value = 1;

      changeInputQty(id, stok);
      document.dispatchEvent(new Event(RENDER_EVENT));
    });

    deleteCartBtn.addEventListener('click', () => {
      addCart.style.display = 'block';
      qtyBtn.style.display = 'none';

      deleteCarts(id);
    });
  });
};

const findCartMenu = (id) => CartMenus.find((cart) => cart.id === id) || null;
const findCartMenuIndex = (id) => {
  for (const index in CartMenus) {
    if (CartMenus[index].id === id) {
      return index;
    }
  }
  return -1;
};

const deleteCarts = (id) => {
  const cartMenuTargetIndex = findCartMenuIndex(id);
  if (cartMenuTargetIndex == -1) return;

  CartMenus.splice(cartMenuTargetIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

// Change Qty on Menu
const changeInputQty = (id, stok) => {
  const cartMenuTarget = findCartMenu(id);
  const min = document.querySelector(`[data-menu-id="${id}"] .qty-min`);
  const plus = document.querySelector(`[data-menu-id="${id}"] .qty-plus`);
  let qtyValue = cartMenuTarget.qty;
  console.log();

  min.addEventListener('click', () => {
    if (qtyValue <= 1) {
      qtyValue = 1;
    } else {
      qtyValue -= 1;
      updateValue();
    }
  });

  plus.addEventListener('click', () => {
    if (qtyValue < stok) {
      qtyValue += 1;
    }

    updateValue();
  });

  const updateValue = () => {
    cartMenuTarget.qty = qtyValue;

    document.querySelector(`[data-menu-id="${id}"] #inputQty`).value = qtyValue;
    // qtyChangeCart(qtyValue, id);
    document.dispatchEvent(new Event(RENDER_EVENT));
  };
};

/* END CART PROCESS */

/* TRANSACTION PROCESS */
const userID = document.querySelector('body').dataset.idUser;
const transactionBtn = document.querySelector('#processTransaction');

transactionBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (CartMenus.length) {
    // Add to Order
    addOrder(userID).then(async (data) => {
      if (data.status) {
        const { id_order } = data.data;

        // Add to transaction
        const promises = CartMenus.map(async (cartMenu) => {
          const { id, qty } = cartMenu;
          const newTransaction = {
            id_order,
            id_menu: id,
            qty,
          };

          return addTransaction(newTransaction).then((data) => {
            if (data.status) {
              // Reduce stock
              return controllerMenu
                .editMenuStock({ id, qty })
                .then((data) => data);
            }
          });
        });

        Promise.all(promises).then((result) => {
          window.location.href = '../pages_user/pesan.php';
        });
      }
    });
  } else {
    console.log('Masih kosong');
  }
});

/* END TRANSACTION PROCESS */

/* TRANSACTION HISTORY */
const getAllTransaction = () => {
  const tableBody = document.querySelector('#transactionList > tbody');

  getTransacti().then((data) => {
    const { users } = data.data;
    let tableElement = '';
    let i = 1;

    users.forEach((user) => {
      const created_at = showFormattedDate(user.created_at);
      const updated_at = showFormattedDate(user.updated_at);

      const accordionBody = `
        <tr class="collapse collapse-detail-${user.id_user}">
          <td></td>
          <td colspan="5" class="py-0">
            <div class="collapse collapse-detail-${user.id_user}">
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
    getUserTotal();
    editUserHandler();
    deleteUserHandler();
  });
};

/* END TRANSACTION HISTORY */

document.addEventListener('DOMContentLoaded', () => {
  getUserByID();
  getMenu();
});
