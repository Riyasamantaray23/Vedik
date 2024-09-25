import axios from 'axios';

const API_URL = "http://localhost:5000/api";

export const fetchData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/data`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
  