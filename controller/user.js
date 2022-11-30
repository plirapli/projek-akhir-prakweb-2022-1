import { URL } from '../config/config.js';

const baseURL = `${URL}/api/user.php?function`;

// Get All User
const getUsers = async () => {
  const endpoint = `${baseURL}=get_user`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

// Get user by id
const getUserId = async (id) => {
  const endpoint = `${baseURL}=get_user_id&id=${id}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const getUserTotalByRole = async () => {
  const endpoint = `${URL}/api/role.php?function=get_role_total`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

export { getUsers, getUserId, getUserTotalByRole };
