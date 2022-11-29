// Base URL
const baseURL = 'http://localhost/olive-chicken-delivery/api/menu.php?function';

// Get User
const getMenu = async () => {
  return fetch(`${baseURL}=get_menu`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

const getMenuId = async (id) => {
  return fetch(`${baseURL}=get_menu_id&id=${id}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

const editMenu = async (req) => {
  return fetch(`${baseURL}=edit_menu`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const editMenuStock = async (req) => {
  return fetch(`${baseURL}=edit_menu_stock`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const deleteMenu = async (id) => {
  return fetch(`${baseURL}=delete_menu&id=${id}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

export { getMenu, getMenuId, editMenu, editMenuStock, deleteMenu };
