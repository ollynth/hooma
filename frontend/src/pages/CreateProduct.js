// src/pages/CreateProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';
import ProductForm from '../components/ProductForm';

const CreateProduct = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await createProduct(formData);
            navigate('/'); // Redirect to dashboard after creation
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <h1>Create New Product</h1>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateProduct;