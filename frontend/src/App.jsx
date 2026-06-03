// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CreateProduct from './pages/CreateProduct';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import CatalogPage from './pages/CatalogPage';
import ProfilePage from './pages/ProfilePage';
import CustomerLayout from './layouts/CustomerLayout';

function App() {
    return (
        <Router>
           <Routes>
                <Route path="/profile" element={<ProfilePage />} />
                <Route element={<CustomerLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<RegisterPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;