// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import CreateProduct from './pages/CreateProduct';
// import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/sign-in" element={<LoginPage />} />
                <Route path="/sign-up" element={<RegisterPage />} />
                {/* <Route path="/" element={<Dashboard />} />
                <Route path="/create" element={<CreateProduct />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;