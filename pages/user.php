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
  <title>User - Olive Fried Chicken</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />

  <link href="../assets/img/favicon.png" rel="icon" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="../assets/css/style.css" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/custom.css" />

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" defer></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js" defer></script>
  <script src="../assets/js/main.js" defer></script>
  <script type="module" src="../assets/js/index.js" defer></script>
  <script type="module" src="../utils/user.js" defer></script>
  </script>
</head>

<body class="min-vh-100 d-flex flex-column" data-user-id=<?= $_SESSION["userID"] ?>>
  <header id="header" class="header fixed-top d-flex align-items-center"></header>
  <aside id="sidebar" data-active-nav="user_list" class="sidebar d-flex flex-column justify-content-between"></aside>

  <main id="main" class="main col">
    <div class="pagetitle">
      <h1>User</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">Home</a></li>
          <li class="breadcrumb-item active">User</li>
        </ol>
      </nav>
    </div>
    <section class="section dashboard">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="d-flex gap-4 card-info"></div>

            <!-- Tabel User -->
            <div class="col-12">
              <div class="card recent-sales overflow-auto">
                <div class="card-body mt-2">
                  <div class="d-flex justify-content-between mb-2 align-items-center">
                    <h5 class="card-title">Daftar Pengguna</h5>
                    <button id="addUserBtn" data-bs-toggle="modal" data-bs-target="#inputUserModal" class="btn btn-primary d-flex align-items-center gap-2">
                      Tambah User
                      <iconify-icon icon="material-symbols:add" width="20"></iconify-icon>
                    </button>
                  </div>

                  <table id="tableUser" class="table table-responsive table-borderless table-user align-middle">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Username</th>
                        <th scope="col" class="text-center">Role</th>
                        <th scope="col" colspan="2" class="text-center">Aksi</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer id="footer" class="footer"></footer>

  <!-- Back to Top -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
    <iconify-icon icon="material-symbols:arrow-upward-rounded" width="24"></iconify-icon>
  </a>

  <!-- Modal Add User -->
  <div class="modal fade" id="inputUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="inputUserModal" aria-hidden="true" aria-modal="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="staticBackdropLabel">
            Tambah User
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Isi Modal -->
        <form id="addUserForm">
          <div class="modal-body">
            <div class="mb-3">
              <label for="inputNama" class="form-label"> Nama Lengkap </label>
              <input type="text" class="form-control" id="inputNama" placeholder="Masukkan nama lengkap" required />
            </div>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">
                Alamat Email
              </label>
              <input type="email" class="form-control" id="inputEmail" placeholder="Masukkan alamat email" required />
            </div>
            <div class="mb-3">
              <label for="inputUsername" class="form-label"> Username </label>
              <input type="text" class="form-control" id="inputUsername" placeholder="Masukkan username" required />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">
                Kata Sandi
              </label>
              <input type="password" class="form-control" id="inputPassword" placeholder="********" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <select class="form-select select-role" required></select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-gray" data-bs-dismiss="modal">
              Tutup
            </button>
            <button type="submit" class="btn btn-primary">Tambah</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Edit User -->
  <div class="modal fade" id="editUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editUserModal" aria-hidden="true" aria-modal="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="staticBackdropLabel">
            Edit User
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Isi Modal -->
        <form id="editUserForm">
          <div class="modal-body">
            <div class="mb-3">
              <label for="editNama" class="form-label"> Nama Lengkap </label>
              <input type="text" class="form-control" id="editNama" placeholder="Masukkan nama lengkap" required />
            </div>
            <div class="mb-3">
              <label for="editEmail" class="form-label"> Alamat Email </label>
              <input type="email" class="form-control" id="editEmail" placeholder="Masukkan alamat email" required />
            </div>
            <div class="mb-3">
              <label for="editUsername" class="form-label"> Username </label>
              <input type="text" class="form-control" id="editUsername" placeholder="Masukkan username" required />
            </div>
            <div class="mb-3">
              <label for="editPassword" class="form-label">
                Kata Sandi
              </label>
              <input type="password" class="form-control" id="editPassword" placeholder="********" required />
            </div>
            <div class="mb-3">
              <label for="editPhoneNumber" class="form-label">
                Telepon
              </label>
              <input type="text" class="form-control" id="editPhoneNumber" placeholder="Nomor telepon" />
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <select class="form-select select-role" required></select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-gray modal-close" data-bs-dismiss="modal">
              Tutup
            </button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Delete User -->
  <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" aria-modal="true">
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