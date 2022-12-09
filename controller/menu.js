import { URL } from '../config/config.js';

// Base URL
const baseURL = `${URL}/api/menu.php?function`;

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

export { getMenu, getMenuId, editMenuStock };
