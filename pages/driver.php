<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />

  <title>Driver List</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon" />
  <link href="../assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

  <!-- Vendor CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="../assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="../assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
  <link href="../assets/vendor/remixicon/remixicon.css" rel="stylesheet" />

  <!-- Template Main CSS File -->
  <link href="../assets/css/style.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <!-- Vendor JS Files -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>

  <!-- Template Main JS File -->
  <script src="../assets/js/main.js" defer></script>

  <!-- Custom JS -->
  <script src="../assets/js/index.js" defer></script>

  <!-- API Calls -->
  <script type="module" src="../utils/driver.js" defer></script>

  <!-- =======================================================
  * Template Name: NiceAdmin - v2.4.1
  * Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body class="min-vh-100 d-flex flex-column">
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center"></header>
  <!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" data-active-nav="driver_list" class="sidebar d-flex flex-column justify-content-between"></aside>

  <main id="main" class="main col">
    <div class="pagetitle">
      <h1>Driver</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">Home</a></li>
          <li class="breadcrumb-item active">Driver</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">
        <!-- Left side columns -->
        <div class="col-lg-12">
          <div class="row">
            <!-- Card -->
            <div class="col-sm">
              <div class="card info-card revenue-card">
                <div class="card-body">
                  <h5 class="card-title">Total Driver</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon bg-gray rounded d-flex align-items-center justify-content-center">
                      <iconify-icon icon="mdi:user"></iconify-icon>
                    </div>
                    <div class="ps-3">
                      <h6>27</h6>
                      <span class="text-muted small">Pengguna</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="col-sm">
              <div class="card info-card revenue-card">
                <div class="card-body">
                  <h5 class="card-title">Driver Aktif</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon bg-gray rounded d-flex align-items-center justify-content-center">
                      <iconify-icon icon="mdi:user"></iconify-icon>
                    </div>
                    <div class="ps-3">
                      <h6>6</h6>
                      <span class="text-muted small">Pengguna</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Card -->
            <div class="col-sm">
              <div class="card info-card revenue-card">
                <div class="card-body">
                  <h5 class="card-title">Driver Tersedia</h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon bg-gray rounded d-flex align-items-center justify-content-center">
                      <iconify-icon icon="mdi:user"></iconify-icon>
                    </div>
                    <div class="ps-3">
                      <h6>21</h6>
                      <span class="text-muted small">Pengguna</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Card -->

            <!-- Tabel User -->
            <div class="col-12">
              <div class="card recent-sales overflow-auto">
                <div class="card-body mt-2">
                  <div class="d-flex justify-content-between mb-2 align-items-center">
                    <h5 class="card-title">Daftar Drirver</h5>
                  </div>

                  <table class="table table-responsive table-borderless table-driver align-middle">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Username</th>
                        <th scope="col">Status</th>
                        <th scope="col">Jarak</th>
                        <th scope="col">Penghasilan</th>
                        <th scope="col">Aksi</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- End Table -->
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

  <!-- Modal Delete User -->
  <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="exampleModalLabel">
            Hapus User
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-gray" data-bs-dismiss="modal">
            Tutup
          </button>
          <button type="button" class="btn btn-danger btn-delete">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</body>

</html>