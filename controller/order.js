const baseURL =
  'http://localhost/olive-chicken-delivery/api/order.php?function';

const getAllOrder = async () => {
  const endpoint = `${baseURL}=get_order`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const getOrderById = async (id_user) => {
  const endpoint = `${baseURL}=get_order_id&id_user=${id_user}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const getTransactionById = async (id_order) => {
  const endpoint = `${baseURL}=get_transaction_id&id_order=${id_order}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const addOrder = async (id_user) => {
  const endpoint = `${baseURL}=add_order`;

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_user }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const addTransaction = async (menu) => {
  const endpoint = `${baseURL}=add_transaction`;

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

export {
  getAllOrder,
  getOrderById,
  getTransactionById,
  addOrder,
  addTransaction,
};
