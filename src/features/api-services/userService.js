import axios from "axios";

const baseUrl = "http://localhost:8000/api/users";
const authBaseUrl = "http://localhost:8000/api/auth";

//fetching the backend api for login API
const signIn = async (userData) => {
  try {
    const response = await axios.post(`${authBaseUrl}/signin`, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//fetching the backend api for logout API
const signOut = async () => {
  try {
    localStorage.removeItem("user");
    const response = await axios.get(`${authBaseUrl}/signout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//fetching the backend api for creating user API
const createUser = async (userData) => {
  try {
    const response = await axios.post(baseUrl, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// fetching the backend api for gettingall users API
const listUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(baseUrl, config);
  console.log(response.data);
  return response.data;
};

//fetching a single user from the backend API
const getUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

//update a single user from the backend API
const updateUser = async (id, userData, token) => {
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
  };
    const response = await axios.patch(`${baseUrl}/${id}`, userData, config);
    console.log(response.data);
    return response.data;
  
};

//delete a single user from the backend API
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  localStorage.removeItem("user");
  console.log(response.data);
  return response.data;
};

export default {
  signIn,
  signOut,
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
