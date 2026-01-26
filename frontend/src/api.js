// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001/api/products'; 

export const fetchProducts = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(API_BASE_URL, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    await axios.delete(`${API_BASE_URL}/${productId}`);
};

export const updateProduct = async (productId, updatedData) => {
    const response = await axios.put(`${API_BASE_URL}/${productId}`, updatedData);
    return response.data;
};