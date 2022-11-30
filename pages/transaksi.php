<?php
require '../utils/cek_session.php';
cek_session();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Dashboard - NiceAdmin Bootstrap Template</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon" />

  <!-- Vendor CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Template Main CSS File -->
  <link href="../assets/css/style.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <!-- Vendor JS Files -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>

  <!-- Custom JS -->
  <script src="../assets/js/main.js" defer></script>
  <script type="module" src="../assets/js/index.js" defer></script>
  <script type="module" src="../utils/transaksi.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column" data-user-id=<?= $_SESSION["userID"] ?>>
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center"></header>
  <!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" data-active-nav="transaksi" class="sidebar d-flex flex-column justify-content-between"></aside>

  <main id="main" class="main col">
    <div class="pagetitle">
      <h1>Transaksi</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">Home</a></li>
          <li class="breadcrumb-item active">Riwayat Transaksi</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">
        <!-- Left side columns -->
        <div class="col-lg-12">
          <div class="row">
            <div class="row card-info"></div>

            <!-- Tabel User -->
            <div class="col-12">
              <div class="card recent-sales overflow-auto">
                <div class="card-body mt-2">
                  <div class="d-flex justify-content-between mb-2 align-items-center">
                    <h5 class="card-title">Daftar Transaksi</h5>
                  </div>

                  <table id="orderList" class="table table-responsive table-borderless align-middle">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">No</th>
                        <th scope="col">Nomor Order</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Dipesan Oleh</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End Recent Sales -->
          </div>
        </div>
        <!-- End Left side columns -->
      </div>
    </section>
  </main>
  <!-- End #main -->

  <footer id="footer" class="footer"></footer>

  <!-- Back to Top -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</body>

</html>