// api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit an existing user
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
