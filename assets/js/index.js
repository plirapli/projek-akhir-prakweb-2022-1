const header = document.querySelector('#header');
header.innerHTML = `
  <div class="d-flex align-items-center justify-content-between">
    <i class="bi bi-list toggle-sidebar-btn"></i>
    <a href="index.html" class="logo d-flex align-items-center ms-3">
      <img src="../assets/img/olive-chicken-logo-brand.jpg" alt="" />
      <!-- <span class="d-none d-lg-block">NiceAdmin</span> -->
    </a>
  </div>
  <!-- End Logo -->

  <nav class="header-nav ms-auto">
    <ul class="d-flex align-items-center">
      <li class="nav-item dropdown pe-3">
        <div class="nav-link nav-profile d-flex align-items-center pe-0">
          <span class="d-none d-md-block pe-2">
            <div>
              Seva Giantama
            </div> 
            <div class="sub-text">
              Admin
            </div> 
          </span>
          <img
            src="../assets/img/profile-default.png"
            alt="Profile"
            class="rounded"
          />
        </div>
        <!-- End Profile Iamge Icon -->
      
      </li>
      <!-- End Profile Nav -->
    </ul>
  </nav>
  <!-- End Icons Navigation -->
`;

// Expand Toggle Click
header.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.toggle-sidebar-btn')) {
    document.querySelector('body').classList.toggle('toggle-sidebar');
  }
});

// Sidebar
const sidebar = document.querySelector('#sidebar');
const url = sidebar.dataset.activeNav;

sidebar.innerHTML = `
  <ul class="sidebar-nav" id="sidebar-nav">
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'dashboard' && 'collapsed'
      }" href="index.html">
        <i class="bi bi-grid"></i>
        <span>Dashboard</span>
      </a>
    </li>
    <!-- End Dashboard Nav -->
    
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'menu_makanan' && 'collapsed'
      }" href="users-profile.html">
        <i class="bi bi-person"></i>
        <span>Menu Makanan</span>
      </a>
    </li>

    <li class="nav-heading">Daftar Pengguna</li>
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'user_list' && 'collapsed'
      }" href="user_list.php">
        <i class="bi bi-person"></i>
        <span>User</span>
      </a>
    </li>
    
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'user_driver' && 'collapsed'
      }" href="users-profile.html">
        <i class="bi bi-person"></i>
        <span>Driver</span>
      </a>
    </li>
    
    <li class="nav-heading">Transaksi</li>
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'transaksi_berlangsung' && 'collapsed'
      }" href="users-profile.html">
        <i class="bi bi-person"></i>
        <span>Transaksi Berlangsung</span>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'riwayat_transaksi' && 'collapsed'
      }" href="users-profile.html">
        <i class="bi bi-person"></i>
        <span>Riwayat Transaksi</span>
      </a>
    </li>

  </ul>
  
  <ul class="sidebar-nav">
    <li class="nav-item">
      <a class="nav-link collapsed text-danger" href="pages-blank.html">
        <i class="bi bi-file-earmark text-danger"></i>
        <span>Keluar</span>
      </a>
    </li>
    <!-- End Blank Page Nav -->
  </ul>
`;

const footer = document.querySelector('#footer');
footer.innerHTML = `
  <div class="copyright">
    &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
  </div>
`;
