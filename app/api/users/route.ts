
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; 

export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: number) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
}
