const baseURL =
  'http://localhost/olive-chicken-delivery/api/order.php?function';

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

export { addOrder, addTransaction };
