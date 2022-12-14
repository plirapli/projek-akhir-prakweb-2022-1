<?php
require '../utils/cek_session.php';
cek_session();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Olive Chicken</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <link href="../assets/img/favicon.png" rel="icon" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="../assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>
  <script src="../assets/js/main.js" defer></script>
  <script type="module" src="../assets/js/indexUser.js" defer></script>
  <script type="module" src="../utils_user/menu.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column" data-id-user=<?= $_SESSION["userID"] ?>>
  <header id="header-user" class="header d-flex align-items-center"></header>
  <div class="bg-white border-2 border-bottom">
    <div class="container">
      <ul class="nav nav-tabs border-0 nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100 active" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu" type="button" role="tab" aria-controls="home" aria-selected="true">
            Menu
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100" id="cart-tab" data-bs-toggle="tab" data-bs-target="#cart" type="button" role="tab" aria-controls="cart" aria-selected="false">
            Keranjang
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100" id="transaksi-tab" data-bs-toggle="tab" data-bs-target="#transaksi" type="button" role="tab" aria-controls="transaction" aria-selected="false">
            Riwayat Transaksi
          </button>
        </li>
      </ul>
    </div>
  </div>

  <div class="col container pb-5">
    <div class="tab-content" id="borderedTabJustifiedContent">
      <div class="tab-pane fade mt-4 show active" id="menu" role="tabpanel" aria-labelledby="menu-tab">
        <div class="col-lg-12">
          <h5 class="mb-3">Daftar Menu</h5>
          <!-- Daftar Menu -->
          <div id="menuList" class="card-menu-container-user"></div>
        </div>
      </div>

      <div class="tab-pane fade mt-4" id="cart" role="tabpanel" aria-labelledby="cart-tab">
        <div class="customer-info"></div>
        <div class="mt-3">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="my-0">Keranjang</h5>
            <button type="button" id="deleteAllCart" class="btn btn-danger-sub">
              Hapus Semua
            </button>
          </div>

          <!-- Shpping Cart Table -->
          <table id="shoppingCart" class="table">
            <thead>
              <th class="w-table-min text-center" scope="col">No</th>
              <th colspan="2" scope="col" class="text-center">Menu</th>
              <th scope="col" class="text-center">Qty</th>
              <th scope="col" colspan="2" class="ps-4 text-center">Harga</th>
              <th scope="col" colspan="2" class="ps-4 text-center">Subtotal</th>
            </thead>
            <tbody>

            </tbody>
            <thead>
              <tr class="fs-5">
                <th colspan="4"></th>
                <th colspan="2" scope="row" class="ps-4 text-center">Total</th>
                <th scope="row" class="w-table-min ps-4">Rp</th>
                <th scope="row" id="cartTotal" class="w-table-min ps-2 text-end">0</th>
              </tr>
            </thead>
          </table>
        </div>
        <button type="button" id="processTransaction" class="btn btn-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#orderModal">
          Pesan Sekarang
        </button>
      </div>

      <div class="tab-pane fade mt-4" id="transaksi" role="tabpanel" aria-labelledby="transaction-tab">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <h5 class="my-0">Transaksi</h5>
          <button type="button" id="refreshTransaction" class="btn btn-gray d-flex align-items-center p-2 me-2">
            <iconify-icon icon="material-symbols:refresh-rounded" width="20"></iconify-icon>
          </button>
        </div>
        <table id="orderList" class="table table-responsive align-middle">
          <thead>
            <tr>
              <th scope="col" class="w-table-min text-center">No</th>
              <th scope="col">Nomor Order</th>
              <th scope="col">Waktu Order</th>
              <th scope="col" class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="orderModalLabel">Sedang Memesan Makanan</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="orderLoading" class="modal-body">
          <div class="d-flex justify-content-center my-4">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div id="orderSuccess" style="display: none;">
          <div class="modal-body">
            <div class="d-flex flex-column place-center">
              <div class="bg-gray d-flex place-center mb-3 rounded-pill bg-success-sub text-success">
                <iconify-icon icon="material-symbols:check-small-rounded" width="80"></iconify-icon>
              </div>
              <div>Makanan anda telah berhasil dipesan.</div>
              <div>Selamat menikmati!</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-gray w-100" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</body>

</html>