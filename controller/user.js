import { URL } from '../config/config.js';

const baseURL = `${URL}/api/user.php?function`;
const baseRoleURL = `${URL}/api/role.php?function`;

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
  const endpoint = `${baseRoleURL}=get_role_total`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

const addUser = async (newUser) => {
  const endpoint = `${baseURL}=add_user`;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const editUser = async (id, editedUser) => {
  const endpoint = `${baseURL}=edit_user&id=${id}`;
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedUser),
  })
    .then((res) => res.json())
    .then((data) => data);
};

// Edit Status
const editUserRole = async (user, role) => {
  const endpoint = `${baseURL}=edit_user_role`;
  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, role }),
  })
    .then((res) => res.json())
    .then((data) => data);
};

const deleteUser = async (id) => {
  const endpoint = `${baseURL}=delete_user&id=${id}`;
  return fetch(endpoint, { method: 'DELETE' })
    .then((res) => res.json())
    .then((data) => data);
};

export {
  getUsers,
  getUserId,
  getUserTotalByRole,
  addUser,
  editUser,
  editUserRole,
  deleteUser,
};
