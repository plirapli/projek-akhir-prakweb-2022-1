import { showFormattedDate } from './convertDate.js';
import { getAllOrder, getTransactionById } from '../controller/order.js';

// Get Order
const getAllOrderHandler = () => {
  const tableBody = document.querySelector('#orderList > tbody');

  getAllOrder().then((data) => {
    const orders = data.data;
    let tableElement = '';
    let i = 1;

    const promises = orders.map(async (order) => {
      const { id_pesanan: id_order } = order;
      const created_at = showFormattedDate(order.created_at);

      const subTable = getTransactionById(id_order).then((data) => {
        const transactions = data.data;
        let subTableElement = { element: '', totalCost: 0 };

        transactions.forEach((transaction) => {
          const { id_transaksi: id, menu, qty, harga } = transaction;
          const subElement = `
            <tr data-transaction-id=${id}>
              <td>${menu}</td>
              <td class="text-center">${qty}</td>
              <td class="text-center">Rp${harga}</td>
              <td class="text-center">Rp${qty * harga}</td>
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
                      <th scope="col" class="text-center">Jumlah</th>
                      <th scope="col" class="text-center">Harga</th>
                      <th scope="col" class="text-center">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${element}
                    <tr>
                      <th colspan=2></th>
                      <th scope="row" class="text-center">Total</th>
                      <th scope="row" class="text-center">Rp${totalCost}</th>
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
            <td>${order?.nama || '[User Telah Dihapus]'}</td>
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

document.addEventListener('DOMContentLoaded', () => {
  getAllOrderHandler();
});
