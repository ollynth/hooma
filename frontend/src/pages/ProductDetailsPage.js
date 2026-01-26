// src/pages/ProductDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../api';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            const products = await fetchProducts();
            const selectedProduct = products.find((p) => p._id === id);
            setProduct(selectedProduct);
        };
        loadProduct();
    }, [id]);

    const handleDelete = async () => {
        await deleteProduct(id);
        navigate('/');
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={`http://localhost:3000${product.defaultImage}`} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <h3>Variations</h3>
            <ul>
                {product.variations.map((variation, index) => (
                    <li key={index}>
                        {variation.color} - {variation.size || 'N/A'} - Stock: {variation.stock}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProductDetailsPage;