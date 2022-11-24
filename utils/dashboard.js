// Get Total
const getTotal = () => {
  const endpoint =
    'http://localhost/olive-chicken-delivery/api/total.php?function=get_total';
  const cardInfo = document.querySelector('.card-info');

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const totals = data.data;
      let cardElement = '';

      for (const totalData of totals) {
        const { name, total, unit, icon } = totalData;
        const element = `
        <div class="col-6">
          <div class="card info-card revenue-card">
            <div class="card-body">
              <h5 class="card-title text-capitalize">${name}</h5>

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

document.addEventListener('DOMContentLoaded', () => {
  getTotal();
});
