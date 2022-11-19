const getDriverId = async (id) => {
  const endpoint = `http://localhost/olive-chicken-delivery/api/driver.php?function=get_user_id&id=${id}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const addDriver = async (id) => {
  const endpoint =
    'http://localhost/olive-chicken-delivery/api/driver.php?function=add_user';
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

const deleteDriver = async (id) => {
  const endpoint = `http://localhost/olive-chicken-delivery/api/driver.php?function=delete_user&id=${id}`;
  return fetch(endpoint, { method: 'DELETE' });
};

export { getDriverId, addDriver, deleteDriver };
