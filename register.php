<?php
session_start();

if (isset($_SESSION["userID"])) {
  if ($_SESSION["role"] != 1) {
    header("location: ./pages_user/index.php");
  } else {
    header("location: ./pages/index.php");
  }
}

if (isset($_GET["pesan"])) {
  $pesan = $_GET["pesan"];
  if ($pesan == 'username_ada') {
    $msg = 'Username telah terdaftar.';
  } else if ($pesan == 'password_beda') {
    $msg = 'Pastikan isi password dan konfirmasi password sudah benar.';
  } else {
    $msg = 'Login Gagal';
  }
} else {
  $msg = '';
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  <title>Register - Olive Chicken</title>

  <!-- Favicons -->
  <link href="./assets/img/favicon.png" rel="icon" />

  <!-- BS CSS Files -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="./assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="./assets/css/custom.css" />

  <!-- BS & Libs -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>
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
                  <h5 class="card-title text-center mb-0 fs-4 fw-bold text-primary pb-1">REGISTER</h5>
                  <p class="mb-4 text-center text-secondary"><?= $msg ?></p>
                  <form class="row" method="POST" action="./controller/register.php">
                    <div class="mb-3">
                      <label for="yourName" class="form-label text-black fw-bold">Nama</label>
                      <div class="input-group has-validation">
                        <input type="text" name="nama" class="form-control" id="yourName" placeholder="Username atau email" required>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="yourEmail" class="form-label text-black fw-bold">Email</label>
                      <div class="input-group has-validation">
                        <input type="email" name="email" class="form-control" id="yourEmail" placeholder="Username atau email" required>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="yourUsername" class="form-label text-black fw-bold">Username</label>
                      <div class="input-group has-validation">
                        <input type="text" name="username" class="form-control" id="yourUsername" placeholder="Username atau email" required>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="yourPassword" class="form-label text-black fw-bold">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" placeholder="********" required>
                    </div>

                    <div class="mb-3">
                      <label for="yourPasswordConfirm" class="form-label text-black fw-bold">Confirm Password</label>
                      <input type="password" name="confirm_password" class="form-control" id="yourPasswordConfirm" placeholder="********" required>
                    </div>

                    <div class="mb-3">
                      <button class="btn btn-primary w-100" type="submit">Daftar</button>
                    </div>
                    <div class="">
                      <p class="small mb-0">
                        Sudah mempunyai akun? <a href="index.php">Masuk</a>
                      </p>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</body>

</html>