import * as controllerMenu from '../controller/menu.js';
import { addOrder, addTransaction, getOrderById } from '../controller/order.js';
import { getUserId, getUsers } from '../controller/user.js';
import { showFormattedDate } from '../utils/convertDate.js';

// Global Variable
const CartMenus = [];
const userID = document.querySelector('body').dataset.idUser;

// Get User by ID
const getUserByID = () => {
  const infoElement = document.querySelector('.customer-info');

  getUserId(userID).then((data) => {
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
        <div 
          class="card card-menu-makanan mb-0 shadow" 
          data-menu-id=${menu.id_menu} 
          data-stok=${menu.stok}
        >
          <img style="height: 20rem; object-fit: cover;" 
            src=${pathMenuImg}/${menu.img_menu} 
            class="card-img-top" alt="..."
          >
          <div class="card-body">
            <h5 class="card-title">${menu.menu}</h5>
            <p class="card-text">
              ${menu.deskripsi}
            </p>
          </div>
          <ul class="list-group list-group-flush border-0">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Stok
              <b class="stok">${menu.stok}</b>
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

  let total = 0;
  let cartElement = '';

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
    const harga = parseInt(card.querySelector('.harga').textContent);
    const stok = card.dataset.stok;
    const qtyBtn = card.querySelector('.qty-btn');
    const deleteCartBtn = card.querySelector('.delete-cart');

    addCart.addEventListener('click', () => {
      const newMenu = { id, qty: 1, harga };

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
          const { id, qty, harga } = cartMenu;
          const newTransaction = {
            id_order,
            id_menu: id,
            qty,
            harga,
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
const getAllTransactionHandler = async () => {
  const tableBody = document.querySelector('#orderList > tbody');

  getOrderById(userID).then((data) => {
    const orders = data.data;
    let tableElement = '';
    let i = 1;

    orders.forEach((order) => {
      let totalCost = 0;
      const created_at = showFormattedDate(order.created_at);

      const accordionBody = `
        <tr class="collapse collapse-detail-${order.id_pesanan} py-3">
          <td></td>
          <td colspan="5" class="py-2">
            <div class="collapse collapse-detail-${order.id_pesanan}">
                <table id="transactionList" class="table table-borderless table-responsive align-middle">
                <thead>
                  <tr>
                    <th scope="col">Nama Menu</th>
                    <th scope="col">Jumlah</th>
                    <th scope="col">Harga</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </td>
        </tr>
      `;

      const element = `
        <tr data-user-id=${order.id_user}>
          <th scope="row" class="w-table-min">1</th>
          <td>#${order.id_pesanan}</td>
          <td>${created_at}</td>
          <td class="w-table-min accordion-header" id="flush-heading-${order.id_pesanan}">
            <button class="btn btn-gray btn-sm mb-1" type="button" data-bs-toggle="collapse" data-bs-target=".collapse-detail-${order.id_pesanan}">
              Detail
            </button>
          </td>
        </tr>
        ${accordionBody}
      `;

      tableElement += element;
    });

    tableBody.innerHTML = tableElement;
  });
};

/* END TRANSACTION HISTORY */

document.addEventListener('DOMContentLoaded', () => {
  getUserByID();
  getMenu();
  getAllTransactionHandler();
});
