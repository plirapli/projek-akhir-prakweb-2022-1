import { getUserId } from '../../controller/user.js';

const header = document.querySelector('#header-user');
const id = document.querySelector('body').dataset.idUser;

getUserId(id).then((data) => {
  const user = data.data;
  header.innerHTML = `
    <div class="d-flex align-items-center justify-content-between">
      <a href="index.php" class="logo d-flex align-items-center ms-3">
        <img src="../assets/img/olive-chicken-logo-brand.jpg" alt="" />
      </a>
    </div>
  
    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown pe-3 position-relative">
          <div class="nav-link nav-profile d-flex align-items-center pe-0">
            <span class="d-none d-md-block pe-2">
              <div>
                ${user?.nama}
              </div> 
              <div class="sub-text">
                ${user?.role}
              </div> 
            </span>
            <img
              src="../assets/img/profile-default.png"
              alt="Profile"
              class="rounded"
            />
          </div>
        </li>
        <li class="nav-item dropdown pe-3 position-relative">
          <div class="nav-link nav-profile d-flex align-items-center pe-0">
            <a href="../pages/logout.php" class="btn btn-gray d-flex align-items-center p-2">
              <iconify-icon icon="material-symbols:exit-to-app-rounded" width="24"></iconify-icon>
            </a>
          </div>
        </li>
        
      </ul>
    </nav>
  `;
});
