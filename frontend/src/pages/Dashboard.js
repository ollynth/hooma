// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    return (
        <div className="mmax-w-6xl mx-auto px-4 py-8">
            <h1>Home Decor Products</h1>
            <Link to="/create" className="btn btn-primary mb-3">Create New Product</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;