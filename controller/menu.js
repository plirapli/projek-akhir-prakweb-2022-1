// Base URL
const baseURL = 'http://localhost/olive-chicken-delivery/api/menu.php?function';

// Get User
const getMenu = async () => {
  return fetch(`${baseURL}=get_menu`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

const deleteMenu = async (id) => {
  return fetch(`${baseURL}=delete_menu&id=${id}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log('Error: ' + err));
};

export { getMenu, deleteMenu };
