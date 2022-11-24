<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  <title>Dashboard - Olive Chicken Delivery</title>

  <!-- Favicons -->
  <link href="./assets/img/favicon.png" rel="icon" />
  <link href="./assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

  <!-- BS CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="./assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" />
  <link href="./assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
  <link href="./assets/vendor/remixicon/remixicon.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="./assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="./assets/css/custom.css" />

  <!-- BS & Libs -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>

  <script src="./assets/js/main.js" defer></script>
  <script src="./assets/js/index.js" defer></script>
  <script type="module" src="../utils/dashboard.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column">
  <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div style="overflow: hidden;" class="card card-body p-0 rounded-3">
                <div class="px-4 py-2 text-center bg-secondary">
                  <img style="max-width: 8rem;" src="./assets/img/olive-chicken-logo-brand.jpg" alt="">
                </div>
                <div class="p-4 pt-0">
                  <h5 class="card-title text-center mb-2 fs-4 fw-bold text-primary">LOGIN</h5>
                  <form class="row g-3 needs-validation" method="POST" action="">
                    <div class="col-12">
                      <label for="yourUsername" class="form-label text-black fw-bold">Username</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" required>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label text-black fw-bold">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" required>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Masuk</button>
                    </div>
                    <div class="col-12">
                      <p class="small mb-0">Belum mempunyai akun? <a href="pages-register.html">Daftar</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main><!-- End #main -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
</body>

</html>