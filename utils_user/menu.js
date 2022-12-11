import { rootURL } from '../config/config.js';
import {
  getCart,
  getCartByMenu,
  addCart,
  updateQty,
  deleteCart,
  purgeCart,
} from '../controller/cart.js';
import * as controllerMenu from '../controller/menu.js';
import {
  addOrder,
  addTransaction,
  getOrderById,
  getTransactionById,
} from '../controller/order.js';
import { getUserId } from '../controller/user.js';
import {
  showFormattedCurrency,
  showFormattedDateDetail,
} from '../utils/convertDate.js';

// Global Variable
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

  controllerMenu.getMenu().then((data) => {
    const menus = data.data;
    let menuElement = '';

    const menuPromises = menus.map(async (menu) => {
      const { id_menu } = menu;

      const checkMenuOnCartHandler = getCartByMenu(id_menu, userID).then(
        ({ data: cart }) => {
          const isFound = cart.hasOwnProperty('qty');

          return `
            <li class="list-group-item py-3">
              <button 
                style="display: ${isFound ? 'none' : 'initial'};"
                class="w-100 btn btn-primary add-to-cart"
                ${menu.stok == 0 ? 'disabled' : ''}
              >
                Tambah
              </button>
              <div 
                class="w-100 flex-column gap-2 qty-btn" 
                style="display: ${isFound ? 'flex' : 'none'};"
              >
                <div class="w-100 d-flex gap-2">
                  <button class="btn btn-primary qty-min"> - </button>
                  <input 
                    type="number" 
                    id="inputQty" 
                    class="w-100 form-control text-center"
                    ${isFound && 'value=' + cart.qty}
                    readonly
                  >
                  <button class="btn btn-primary qty-plus"> + </button>
                </div>
                <button class="w-100 btn btn-sm btn-gray delete-cart text-danger"> Hapus </button>
              </div>
            </li>
          `;
        }
      );

      const element = async () => {
        return `
          <div 
            class="card card-menu-makanan mb-0 shadow" 
            data-menu-id=${id_menu} 
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
              <li class="list-group-item d-flex justify-content-between align-items-center ${
                menu.stok > 0 ? '' : 'text-danger'
              }">
                <div class="d-flex align-items-center gap-2">
                  <iconify-icon icon="mdi:food-drumstick-outline" width="20"></iconify-icon>
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
              ${await checkMenuOnCartHandler}
            </ul>
          </div>
        `;
      };

      return await element();
    });

    Promise.all(menuPromises).then((result) => {
      result.forEach((res) => {
        menuElement += res;
      });

      menuList.innerHTML = menuElement;
      addCartHandler();
    });
  });
};

/* CART PROCESS */
const RENDER_EVENT = 'render-cart';
const pathMenuImg = `/${rootURL}/assets/img/menu`;

const checkButton = (cartCount) => {
  const pesanBtn = document.querySelector('#processTransaction');
  const hapusSemuaBtn = document.querySelector('#deleteAllCart');
  const isDisabled = cartCount <= 0;

  hapusSemuaBtn.disabled = isDisabled;
  pesanBtn.disabled = isDisabled;
};

document.addEventListener(RENDER_EVENT, async () => {
  const cartListTable = document.querySelector('#shoppingCart > tbody');
  const cartTotal = document.getElementById('cartTotal');
  let total = 0;
  let cartElement = '';

  getCart(userID).then(({ data: carts }) => {
    let no = 1;

    for (const cart of carts) {
      const { id_cart, id_menu, menu, img_menu, harga } = cart;

      // Cek stok dengan qty di cart
      const stok = parseInt(cart.stok);
      let qty = parseInt(cart.qty);
      if (stok < qty) {
        qty = stok;
        updateQty(id_menu, userID, stok).then(() => getMenu());
      }
      const subtotal = harga * qty;

      const element = `
        <tr data-menu-id=${id_cart} class="align-middle">
          <th scope="row" class="text-center">${no++}</th>
          <td class="w-table-min px-4">
            <img 
              src=${pathMenuImg}/${img_menu} 
              alt="Menu Makanan"
              style="width: 4rem; height: 4rem" 
              class="bg-black rounded-3 my-2"
            >
          </td>
          <td class="w-table-min">${menu}</td>
          <td class="text-center">${qty}</td>

          <td class="w-table-min ps-4">Rp</td>
          <td class="w-table-min text-end ps-2">${showFormattedCurrency(
            harga
          )}</td>
          
          <td class="w-table-min ps-4">Rp</td>
          <td class="w-table-min text-end ps-2">${showFormattedCurrency(
            subtotal
          )}</td>
        </tr>
      `;

      total += subtotal;
      cartElement += element;
    }

    cartTotal.innerHTML = showFormattedCurrency(total);
    cartListTable.innerHTML = cartElement;
    checkButton(carts.length);
  });
});

const addCartHandler = () => {
  const addCartBtn = document.querySelectorAll('.add-to-cart');

  addCartBtn.forEach((addBtn) => {
    const card = addBtn.parentElement.parentElement.parentElement;
    const id_menu = card.dataset.menuId;
    const stok = card.dataset.stok;
    const qtyBtn = card.querySelector('.qty-btn');
    const deleteCartBtn = card.querySelector('.delete-cart');

    const minBtn = document.querySelector(
      `[data-menu-id="${id_menu}"] .qty-min`
    );
    const plusBtn = document.querySelector(
      `[data-menu-id="${id_menu}"] .qty-plus`
    );

    const changeQty = (qty) => {
      return (document.querySelector(
        `[data-menu-id="${id_menu}"] #inputQty`
      ).value = qty);
    };

    // Get qty from input
    const getQty = () => {
      return parseInt(
        document.querySelector(`[data-menu-id="${id_menu}"] #inputQty`).value
      );
    };

    // Add btn event
    addBtn.addEventListener('click', () => {
      const newMenu = { id_menu, qty: 1, id_user: userID };

      addBtn.style.display = 'none';
      qtyBtn.style.display = 'flex';

      addCart(newMenu).then(() => {
        changeQty(1);
        document.dispatchEvent(new Event(RENDER_EVENT));
      });
    });

    // Delete btn event
    deleteCartBtn.addEventListener('click', () => {
      addBtn.style.display = 'block';
      qtyBtn.style.display = 'none';

      deleteCart(id_menu, userID).then(() => {
        changeQty(1);
        document.dispatchEvent(new Event(RENDER_EVENT));
      });
    });

    // Minus btn event
    minBtn.addEventListener('click', () => {
      let qty = getQty();
      if (qty <= 1) {
        qty = 1;
      } else {
        qty -= 1;
        updateValue(qty);
      }
    });

    // Plus btn event
    plusBtn.addEventListener('click', () => {
      let qty = getQty();
      if (qty < stok) {
        qty += 1;
        updateValue(qty);
      }
    });

    const updateValue = (qty) => {
      updateQty(id_menu, userID, qty).then(() => {
        changeQty(qty);
        document.dispatchEvent(new Event(RENDER_EVENT));
      });
    };
  });
};

const deleteAllCartHandler = () => {
  const deleteAllCartBtn = document.querySelector('#deleteAllCart');
  deleteAllCartBtn.addEventListener('click', () => {
    purgeCart(userID).then(() => {
      getMenu();
      document.dispatchEvent(new Event(RENDER_EVENT));
    });
  });
};

/* END CART PROCESS */

/* TRANSACTION PROCESS */
const transactionBtn = document.querySelector('#processTransaction');
transactionBtn.addEventListener('click', (e) => {
  e.preventDefault();

  getCart(userID).then(({ data: carts }) => {
    if (carts.length) {
      // Add to Order
      addOrder(userID).then(async (order) => {
        if (order.status) {
          const { id_order } = order.data;

          // Add to transaction
          const cartPromises = carts.map(async (cartMenu) => {
            const { id_menu, menu, qty, harga } = cartMenu;
            const newTransaction = {
              id_order,
              menu,
              qty,
              harga,
            };

            return addTransaction(newTransaction).then((data) => {
              if (data.status) {
                // Reduce stock
                return controllerMenu
                  .editMenuStock({ id_menu, qty })
                  .then(({ status }) => {
                    if (status) {
                      return purgeCart(userID).then((data) => data);
                    }
                  });
              }
            });
          });

          Promise.all(cartPromises).then((result) => {
            const loadingModal = document.querySelector('#orderLoading');
            const successModal = document.querySelector('#orderSuccess');

            loadingModal.style.display = 'none';
            successModal.style.display = 'block';

            getMenu();
            document.dispatchEvent(new Event(RENDER_EVENT));
            getAllTransactionHandler();
          });
        }
      });
    }
  });
});

/* END TRANSACTION PROCESS */

/* TRANSACTION HISTORY */
const getAllTransactionHandler = () => {
  const tableBody = document.querySelector('#orderList > tbody');

  getOrderById(userID).then(async (data) => {
    const orders = data.data;
    const emptyTable = `
      <tr>
        <td colspan="4" class="">Anda belum pernah memesan</td>
      </tr>
    `;
    let tableElement = '';
    let i = 1;

    const promises = orders.map(async (order) => {
      const { id_pesanan: id_order } = order;
      const created_at = showFormattedDateDetail(order.created_at);

      const subTable = getTransactionById(id_order).then((data) => {
        const transactions = data.data;
        let subTableElement = { element: '', totalCost: 0 };

        transactions.forEach((transaction) => {
          const { id_transaksi: id, menu, qty, harga } = transaction;
          const subtotal = showFormattedCurrency(qty * harga);

          const subElement = `
            <tr data-transaction-id=${id}>
              <td>${menu}</td>
              <td class="text-center">${qty}</td>

              <td class="w-table-min ps-4">Rp</td>
              <td class="w-table-min text-end ps-2">${showFormattedCurrency(
                harga
              )}</td>
              
              <td class="w-table-min ps-4">Rp</td>
              <td class="w-table-min text-end ps-2">${subtotal}</td>
            </tr>
          `;

          subTableElement.totalCost += qty * harga;
          subTableElement.element += subElement;
        });

        return subTableElement;
      });

      const accordionBody = async () => {
        const { totalCost, element } = await subTable;

        return `
          <tr class="collapse collapse-detail-${id_order} py-3">
            <td></td>
            <td colspan="3" class="py-2">
              <div class="collapse collapse-detail-${id_order}">
                <table id="transactionList" class="table table-sm table-responsive align-middle">
                  <thead>
                    <tr>
                      <th scope="col">Nama Menu</th>
                      <th scope="col" class="text-center">Qty</th>
                      <th scope="col" colspan="2" class="ps-4 text-center">Harga</th>
                      <th scope="col" colspan="2" class="ps-4 text-center">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${element}
                    <tr>
                      <th colspan="2"></th>
                      <th colspan="2" scope="row" class="ps-4 text-center">Total</th>
                      <th scope="row" class="w-table-min ps-4">Rp</th>
                      <th scope="row" class="w-table-min ps-2 text-end">
                        ${showFormattedCurrency(totalCost)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        `;
      };

      const element = async () => {
        return `
          <tr data-order-id=${id_order}>
            <th scope="row" class="w-table-min text-center">${i++}</th>
            <td>#${id_order}</td>
            <td>${created_at}</td>
            <td class="w-table-min accordion-header" id="flush-heading-${id_order}">
              <button class="btn btn-gray btn-sm mb-1" type="button" data-bs-toggle="collapse" data-bs-target=".collapse-detail-${id_order}">
                Detail
              </button>
            </td>
          </tr>
          ${await accordionBody()}
        `;
      };

      return await element();
    });

    Promise.all(promises).then((result) => {
      result.forEach((res) => {
        tableElement += res;
      });
      tableBody.innerHTML = tableElement || emptyTable;
    });
  });
};

const refereshTransactionHandler = () => {
  const refreshBtn = document.querySelector('#refreshTransaction');
  refreshBtn.addEventListener('click', () => {
    getAllTransactionHandler();
  });
};

/* END TRANSACTION HISTORY */

document.addEventListener('DOMContentLoaded', () => {
  getUserByID();
  getMenu();
  deleteAllCartHandler();
  getAllTransactionHandler();
  refereshTransactionHandler();
  document.dispatchEvent(new Event(RENDER_EVENT));
});
