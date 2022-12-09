<?php
require '../utils/cek_session.php';
cek_session();
cek_admin();

if (isset($_GET["pesan"])) {
  $pesan = $_GET["pesan"];
  $class = "bg-gray";

  if ($pesan == 'stok_kurang') {
    $msg = 'Stok yang dimasukkan kurang dari jumlah yang ada di keranjang.';
    $class = 'bg-danger-sub text-danger';
  } else if ($pesan == 'add_success') {
    $msg = 'Berhasil menambahkan menu baru';
    $class = 'bg-success-sub text-success';
  } else if ($pesan == 'update_success') {
    $msg = 'Update Berhasil';
    $class = 'bg-success-sub text-success';
  } else if ($pesan == 'delete_success') {
    $msg = 'Berhasil menghapus menu';
    $class = 'bg-success-sub text-success';
  } else {
    $msg = 'Berhasil memperbarui data';
  }
} else {
  $msg = '';
  $class = '';
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Menu Makanan - Olive Fried Chicken</title>
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
  <script type="module" src="../utils/menu.js" defer></script>
</head>

<body class="min-vh-100 d-flex flex-column" data-user-id=<?= $_SESSION["userID"] ?>>
  <header id="header" class="header fixed-top d-flex align-items-center"></header>
  <aside id="sidebar" data-active-nav="menu" class="sidebar d-flex flex-column justify-content-between"></aside>

  <main id="main" class="main col">
    <div class="pagetitle">
      <h1>Menu Makanan</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.php">Home</a></li>
          <li class="breadcrumb-item active">Menu Makanan</li>
        </ol>
      </nav>
    </div>

    <section class="section dashboard">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-12 d-flex justify-content-between mb-3 align-items-center">
              <h5 class="mb-0">Daftar Menu</h5>
              <button id="addUserBtn" data-bs-toggle="modal" data-bs-target="#inputMenuModal" class="btn btn-primary d-flex align-items-center gap-2">
                Tambah Menu
                <iconify-icon icon="material-symbols:add" width="20"></iconify-icon>
              </button>
            </div>

            <!-- Nampilin -->
            <?php if ($msg != '') : ?>
              <div id="msgHandler" class="mb-3">
                <div class="d-flex aling-items-center justify-content-between px-3 py-3 rounded <?= $class ?>">
                  <?= $msg ?>
                  <button type="button" class="btn d-flex align-items-center p-1">
                    <iconify-icon icon="material-symbols:close" width="16"></iconify-icon>
                  </button>
                </div>
              </div>
            <?php endif ?>

            <!-- Daftar Menu -->
            <div id="menuList" class="card-menu-container"></div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer id="footer" class="footer"></footer>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
    <iconify-icon icon="material-symbols:arrow-upward-rounded" width="24"></iconify-icon>
  </a>

  <!-- Modal Add Menu -->
  <div class="modal fade" id="inputMenuModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="inputUserModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="staticBackdropLabel">
            Tambah Menu
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Isi Modal -->
        <form method="POST" action="../api/menu.php?function=add_menu" enctype="multipart/form-data" id="addCabangForm">
          <div class="modal-body">
            <div class="mb-3">
              <label for="inputMenu" class="form-label"> Nama Menu </label>
              <input type="text" class="form-control" id="inputMenu" name="menu" placeholder="Nama Menu" required />
            </div>
            <div class="mb-3">
              <label for="inputDeskripsi" class="form-label"> Deskripsi </label>
              <textarea class="form-control" id="inputDeskripsi" name="deskripsi" rows="3" placeholder="Deksripsi" required></textarea>
            </div>
            <div class="mb-3">
              <label for="inputImg" class="mb-1">Gambar Menu</label>
              <input type="file" name="img" accept="image/png, image/jpeg" id="inputImg" class="form-control" required />
            </div>
            <div class="mb-3 d-flex gap-3">
              <div class="w-25">
                <label for="inputStok" class="form-label"> Stok </label>
                <input type="number" min="0" class="form-control" id="inputStok" name="stok" placeholder="Stok" required />
              </div>
              <div class="w-100">
                <label for="inputHarga" class="form-label"> Harga </label>
                <div class="d-flex align-items-center gap-2">
                  <span>Rp</span>
                  <input min="0" type="number" class="form-control" id="inputHarga" name="harga" placeholder="Harga" required />
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-gray" data-bs-dismiss="modal">
              Tutup
            </button>
            <button type="submit" name="add_menu" class="btn btn-primary">Tambah</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Edit Menu -->
  <div class="modal fade" id="editMenuModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editMenuModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="staticBackdropLabel">
            Edit Menu
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Isi Modal -->
        <form method="POST" action="" enctype="multipart/form-data" id="editMenuForm">
          <div class="modal-body">
            <div class="mb-3">
              <label for="editMenu" class="form-label"> Nama Menu </label>
              <input type="text" class="form-control" id="editMenu" name="menu" placeholder="Nama Menu" required />
            </div>
            <div class="mb-3">
              <label for="editDeskripsi" class="form-label"> Deskripsi </label>
              <textarea class="form-control" id="editDeskripsi" name="deskripsi" rows="3" placeholder="Deksripsi" required></textarea>
            </div>
            <div class="mb-3">
              <label for="editImg" class="mb-1">Gambar Menu</label>
              <input type="file" name="img" accept="image/png, image/jpeg" id="editImg" class="form-control" />
            </div>
            <div class="mb-3 d-flex gap-3">
              <div class="w-25">
                <label for="editStok" class="form-label"> Stok </label>
                <input type="number" class="form-control" id="editStok" name="stok" placeholder="Stok" required />
              </div>
              <div class="w-100">
                <label for="editHarga" class="form-label"> Harga </label>
                <div class="d-flex align-items-center gap-2">
                  <span>Rp</span>
                  <input type="number" class="form-control" id="editHarga" name="harga" placeholder="Harga" required />
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-gray" data-bs-dismiss="modal">
              Tutup
            </button>
            <button type="submit" name="add_menu" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Delete Menu -->
  <div class="modal fade" id="deleteMenuModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-normal" id="deleteModalLabel">
            Hapus Menu
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