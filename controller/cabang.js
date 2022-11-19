// Base URL
const baseURL =
  'http://localhost/olive-chicken-delivery/api/cabang.php?function';

// Get User
const getCabang = async () => {
  return fetch(`${baseURL}=get_cabang`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

const addCabang = async (newCabang) => {
  // Dikirim ke database
  return fetch(`${baseURL}=add_cabang`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCabang),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

const deleteCabang = async (id) => {
  return fetch(`${baseURL}=delete_cabang&id=${id}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

export { getCabang, addCabang, deleteCabang };
