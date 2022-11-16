// Select Element
const tableBody = document.querySelector('.table-user > tbody');

// API Call
const endpoint =
  'http://localhost/olive-chicken-delivery/api/user.php?function=get_user';
fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    const users = data.data;
    let tableElement = '';

    users.forEach((user) => {
      const element = `
        <tr data-user-id = ${user.id}>
          <th scope="row">1</th>
          <td>${user.nama}</td>
          <td>${user.username}</td>
          <td>${user.id_role}</td>
          <td>
            <a href="#" class="text-gray">
              <iconify-icon icon="material-symbols:edit" width="20"></iconify-icon>
            </a>
            <a href="#" class="text-danger-sub">
              <iconify-icon icon="material-symbols:delete" width="20"></iconify-icon>
            </a>
          </td>
        </tr>
      `;

      tableElement += element;
    });

    tableBody.innerHTML = tableElement;
  });

// Hapus User
