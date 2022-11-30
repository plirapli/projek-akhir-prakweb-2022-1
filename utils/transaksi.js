import { showFormattedDate } from './convertDate.js';
import { getAllOrder } from '../controller/order.js';

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
