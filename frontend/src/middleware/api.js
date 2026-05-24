// src/middleware/api.js
import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_BE_URL;
const API_BASE_URL = process.env.REACT_APP_BE_URL;

export const loginUser = async (identifier, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { identifier, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, { firstName, lastName, email, password });
        return response.data;
    } catch (err) {
        console.log('Backend error:', err.response?.data);
        throw err;
    }
};

export const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(API_BASE_URL+ "/products", productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    await axios.delete(`${API_BASE_URL}/products/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedData);
    return response.data;
};