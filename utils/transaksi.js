import { showFormattedDate } from './convertDate.js';
import { getUserTotalByRole } from '../controller/user.js';
import { getAllOrder } from '../controller/order.js';

// Base URL

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
                <div
                  class="card-icon bg-gray rounded d-flex align-items-center justify-content-center"
                >
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

// Get Order
const getAllOrderHandler = () => {
  const tableBody = document.querySelector('#orderList > tbody');

  getAllOrder().then((data) => {
    const orders = data.data;
    let tableElement = '';
    let i = 1;

    orders.forEach((order) => {
      const created_at = showFormattedDate(order.created_at);
      const { id_pesanan: id_order } = order;

      const element = `
      
        <tr data-order-id = ${id_order}>
          <th scope="row" class="w-table-min text-center">${i++}</th>
          <td>#${id_order}</td>
          <td>${created_at}</td>
          <td>${order.nama}</td>
        </tr>
      `;

      tableElement += element;
    });

    tableBody.innerHTML = tableElement;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getAllOrderHandler();
});
