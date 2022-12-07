import { URL } from '../config/config.js';

const baseURL = `${URL}/api/cart.php?function`;

const getCarts = async () => {
  const endpoint = `${baseURL}=get_cart`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const getCartByMenu = async (id) => {
  const endpoint = `${baseURL}=get_cart_id&id=${id}`;
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

const updateQty = async (id, qty) => {
  const endpoint = `${baseURL}=update_qty&id=${id}`;

  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ qty }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export { getCarts, getCartByMenu, addCart, updateQty };
