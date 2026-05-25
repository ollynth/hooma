// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CreateProduct from './pages/CreateProduct';
// import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import CustomerLayout from './layouts/CustomerLayout';

function App() {
    return (
        <Router>
            <Routes element= {<CustomerLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<RegisterPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                {/* <Route path="/create" element={<CreateProduct />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;