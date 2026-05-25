// src/middleware/api.js
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BE_URL;
const API_BASE_URL = process.env.REACT_APP_BE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

// Authentication API calls
export const loginUser = async (identifier, password) => {
    try {
        const response = await api.post(`${API_BASE_URL}/auth/login`, { identifier, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post(`${API_BASE_URL}/auth/register`, { firstName, lastName, email, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

// Product API calls
export const fetchProducts = async () => {
    const response = await api.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post(`${API_BASE_URL}/products`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    await api.delete(`${API_BASE_URL}/products/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
    const response = await api.put(`${API_BASE_URL}/products/${productId}`, updatedData);
    return response.data;
};