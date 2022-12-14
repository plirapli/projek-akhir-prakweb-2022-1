import { URL } from '../config/config.js';
import { nFormatter } from './convertDate.js';

// Get Total
const getTotal = () => {
  const endpoint = `${URL}/api/total.php?function=get_total`;
  const cardInfo = document.querySelector('.card-info');

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const totals = data.data;
      let cardElement = '';

      for (const totalData of totals) {
        const { name, total, icon, url } = totalData;
        const totalDigit = total.toString().length;
        const formattedTotal =
          name == 'total transaksi'
            ? `Rp${nFormatter(total, totalDigit)}`
            : total;

        const element = `
        <div class="col-md-6">
          <div class="card info-card revenue-card">
            <div class="card-body">
              <h5 class="card-title text-capitalize">${name}</h5>
              <div class="d-flex align-items-center">
                <div class="card-icon bg-gray rounded d-flex align-items-center justify-content-center">
                  <iconify-icon icon="${icon}" width="32"></iconify-icon>
                </div>
                <div class="ps-3">
                  <h6>${formattedTotal}</h6>
                  <span class="text-muted small text-capitalize">${name}</span>
                </div>
              </div>
              <a class="mt-3 btn btn-primary w-100" href="${
                url || 'index.php'
              }">Lihat Semua</a>
            </div>
          </div>
        </div>`;
        cardElement += element;
      }
      cardInfo.innerHTML = cardElement;
    });
};

document.addEventListener('DOMContentLoaded', () => {
  getTotal();
});
