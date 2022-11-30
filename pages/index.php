<?php
require '../utils/cek_session.php';
cek_session();
cek_admin();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Dashboard - Olive Chicken</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <!-- Favicons -->
  <link href="../assets/img/favicon.png" rel="icon" />

  <!-- BS CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="../assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <!-- BS & Libs -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>

  <script src="../assets/js/main.js" defer></script>
  <script type="module" src="../assets/js/index.js" defer></script>
  <script type="module" src="../utils/dashboard.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column" data-user-id=<?= $_SESSION["userID"] ?>>
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center"></header>
  <!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" data-active-nav="dashboard" class="sidebar d-flex flex-column justify-content-between"></aside>

  <main id="main" class="main col">
    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">
        <!-- Left side columns -->
        <div class="col-lg-12">
          <div class="row">
            <div class="row card-info">
            </div>
          </div>
        </div>
        <!-- End Left side columns -->
      </div>
    </section>
  </main>
  <!-- End #main -->

  <footer id="footer" class="footer"></footer>

  <!-- Back to Top -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
    <iconify-icon icon="material-symbols:arrow-upward-rounded" width="24"></iconify-icon>
  </a>
</body>

</html>