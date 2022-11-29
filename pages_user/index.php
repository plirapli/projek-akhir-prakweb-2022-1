<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  <title>Dashboard - Olive Chicken Delivery</title>

  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon" />
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

  <!-- BS CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="../assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <!-- BS & Libs -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>

  <script src="../assets/js/main.js" defer></script>
  <script type="module" src="../assets/js/indexUser.js" defer></script>
  <script type="module" src="../utils_user/menu.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column" data-id-user=5>
  <header id="header-user" class="header d-flex align-items-center">
  </header>

  <div class="bg-white border-2 border-bottom">
    <div class="container">
      <ul class="nav nav-tabs border-0 nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100" id="menu-tab" data-bs-toggle="tab" data-bs-target="#menu" type="button" role="tab" aria-controls="home" aria-selected="false">
            Menu
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100" id="cart-tab" data-bs-toggle="tab" data-bs-target="#cart" type="button" role="tab" aria-controls="cart" aria-selected="false">
            Keranjang
          </button>
        </li>
        <li class="nav-item flex-fill" role="presentation">
          <button class="nav-link p-3 w-100 active" id="transaksi-tab" data-bs-toggle="tab" data-bs-target="#transaksi" type="button" role="tab" aria-controls="transaction" aria-selected="true">
            Riwayat Transaksi
          </button>
        </li>
      </ul>
    </div>
  </div>

  <div class="col container pb-3">
    <div class="tab-content" id="borderedTabJustifiedContent">
      <div class="tab-pane fade mt-4" id="menu" role="tabpanel" aria-labelledby="menu-tab">
        <div class="col-lg-12">
          <h5 class="mb-3">Daftar Menu</h5>

          <!-- Daftar Menu -->
          <div id="menuList" class="card-menu-container-user"></div>

        </div>
      </div>

      <div class="tab-pane fade mt-4" id="cart" role="tabpanel" aria-labelledby="cart-tab">
        <div class="customer-info"></div>
        <div class="mt-3">
          <h5>Keranjang</h5>
          <div id="shoppingCart"></div>
          <div class="text-end mt-3">
            <span>Total: </span>
            <span class="fw-bold">
              Rp<span id="cartTotal">0</span>
            </span>
          </div>
        </div>
        <a href="pesan.php" id="processTransaction" class="btn btn-primary w-100 mt-4">Pesan Sekarang</a>
      </div>


      <div class="tab-pane fade mt-4 show active" id="transaksi" role="tabpanel" aria-labelledby="transaction-tab">
        <h5>Transaksi</h5>
        <table id="transactionList" class="table table-responsive align-middle">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nomor Order</th>
              <th scope="col">Tanggal</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr data-user-id=${user.id_user}>
              <th scope="row" class="w-table-min">1</th>
              <td>#[Nomor Order]</td>
              <td>[Tanggal]</td>
              <td class="w-table-min accordion-header" id="flush-heading-${user.id_user}">
                <button class="btn btn-gray btn-sm mb-1" type="button" data-bs-toggle="collapse" data-bs-target=".collapse-detail-${user.id_user}">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

</body>

</html>