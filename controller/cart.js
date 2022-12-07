import { URL } from '../config/config.js';

const baseURL = `${URL}/api/cart.php?function`;

const getCart = async (id) => {
  const endpoint = `${baseURL}=get_cart&id=${id}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const getCartByMenu = async (menuID, userID) => {
  const endpoint = `${baseURL}=get_cart_id&id_menu=${menuID}&id_user=${userID}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const addCart = async (menu) => {
  const endpoint = `${baseURL}=add_cart`;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menu),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const updateQty = async (id_menu, id_user, qty) => {
  const endpoint = `${baseURL}=update_qty`;
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_menu, qty, id_user }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const deleteCart = async (menuID, userID) => {
  const endpoint = `${baseURL}=delete_cart&id_menu=${menuID}&id_user=${userID}`;
  return fetch(endpoint, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data);
};

const purgeCart = async (userID) => {
  const endpoint = `${baseURL}=purge_cart&id_user=${userID}`;
  return fetch(endpoint, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data);
};

export { getCart, getCartByMenu, addCart, updateQty, deleteCart, purgeCart };
