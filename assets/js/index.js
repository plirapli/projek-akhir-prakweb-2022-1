import { getUserId } from '../../controller/user.js';

const getUserHandler = () => {
  const header = document.querySelector('#header');
  const userID = document.querySelector('body').dataset.userId;

  getUserId(userID).then((data) => {
    const user = data.data;

    header.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <i class="bi bi-list toggle-sidebar-btn"></i>
        <a href="index.php" class="logo d-flex align-items-center ms-3">
          <img src="../assets/img/olive-chicken-logo-brand.jpg" alt="" />
        </a>
      </div>
  
      <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
          <li class="nav-item dropdown pe-3">
            <div class="nav-link nav-profile d-flex align-items-center pe-0">
              <span class="d-none d-md-block pe-2">
                <div>
                  ${user?.nama}
                </div> 
                <div class="sub-text text-end">
                  ${user?.role}
                </div> 
              </span>
            </div>
            <!-- End Profile Iamge Icon -->
          
          </li>
          <!-- End Profile Nav -->
        </ul>
      </nav>
    `;
  });
};

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
      <a class="nav-link d-flex align-items-center ${
        sidebar.dataset.activeNav != 'dashboard' && 'collapsed'
      }" href="index.php">
        <iconify-icon icon="material-symbols:window" width="18"></iconify-icon>
        <span class="ms-2">Dashboard</span>
      </a>
    </li>
    <!-- End Dashboard Nav -->
    
    <li class="nav-item">
      <a class="nav-link d-flex align-items-center ${
        sidebar.dataset.activeNav != 'menu' && 'collapsed'
      }" href="menu_makanan.php">
        <iconify-icon icon="mdi:food-drumstick" width="18"></iconify-icon>
        <span class="ms-2">Menu Makanan</span>
      </a>
    </li>

    <li class="nav-heading">Daftar Pengguna</li>
    <li class="nav-item">
      <a class="nav-link d-flex align-items-center ${
        sidebar.dataset.activeNav != 'user_list' && 'collapsed'
      }" href="user.php">
        <iconify-icon icon="mdi:user" width="18"></iconify-icon>
        <span class="ms-2">User</span>
      </a>
    </li>
    
    <li class="nav-heading">Transaksi</li>
    <li class="nav-item">
      <a class="nav-link ${
        sidebar.dataset.activeNav != 'transaksi' && 'collapsed'
      }" href="transaksi.php">
        <iconify-icon icon="mdi:clipboard-text" width="18"></iconify-icon>
        <span class="ms-2">Riwayat Transaksi</span>
      </a>
    </li>
  </ul>
  
  <ul class="sidebar-nav">
    <li class="nav-item">
      <a class="nav-link collapsed text-danger" href="logout.php">
        <iconify-icon icon="material-symbols:exit-to-app-rounded" width="18"></iconify-icon>
        <span class="ms-2">Keluar</span>
      </a>
    </li>
    <!-- End Blank Page Nav -->
  </ul>
`;

const footer = document.querySelector('#footer');
footer.innerHTML = `
  <div class="d-flex justify-content-center align-items-center">
    &copy; 2022 Copyright &nbsp; <b>Olive Chicken</b>. All Rights Reserved
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  getUserHandler();
});
