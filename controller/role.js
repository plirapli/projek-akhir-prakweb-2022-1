import { URL } from '../config/config.js';

const baseURL = `${URL}/api/role.php?function`;

const getUserRole = async () => {
  const endpoint = `${baseURL}=get_role`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

export { getUserRole };
