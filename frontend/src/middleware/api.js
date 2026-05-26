// src/middleware/api.js
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BE_URL;
const API_BASE_URL = process.env.REACT_APP_BE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

// Authentication API calls
export const loginUser = async (identifier, password) => {
    try {
        const response = await api.post('/auth/login', { identifier, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await api.post('/auth/register', { firstName, lastName, email, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

// Product API calls
export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const fetchDetailProducts = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    await api.delete(`/products/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
    const response = await api.put(`/products/${productId}`, updatedData);
    return response.data;
};

// Cart API calls
export const fetchCart= async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (productId, quantity) => {
    const response = await api.post(`/cart/${productId}`, { quantity });
    return response.data;
}