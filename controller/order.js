const baseURL =
  'http://localhost/olive-chicken-delivery/api/order.php?function';

const addOrder = async (id) => {
  const endpoint = `${baseURL}=add_order`;

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_user: id }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

export { addOrder };
