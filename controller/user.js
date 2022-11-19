const baseURL = 'http://localhost/olive-chicken-delivery/api/user.php?function';

// Get user by id
const getUserId = async (id) => {
  const endpoint = `${baseURL}=get_user_id&id=${id}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

// Get user by username
const getUserName = async (username) => {
  const endpoint = `${baseURL}=get_user_username&username=${username}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
};

export { getUserId, getUserName };
