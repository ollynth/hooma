// src/components/ProductForm.js
import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialValues }) => {
    const [formData, setFormData] = useState({
        name: initialValues?.name || '',
        price: initialValues?.price || 0,
        description: initialValues?.description || '',
        category: initialValues?.category || '',
        variations: initialValues?.variations || [{ color: '', stock: 0, sku: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVariationChange = (index, field, value) => {
        const newVariations = [...formData.variations];
        newVariations[index][field] = value;
        setFormData({ ...formData, variations: newVariations });
    };

    const addVariation = () => {
        setFormData({ ...formData, variations: [...formData.variations, { color: '', stock: 0, sku: '' }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div>
                <h3>Variations</h3>
                {formData.variations.map((variation, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Color"
                            value={variation.color}
                            onChange={(e) => handleVariationChange(index, 'color', e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={variation.stock}
                            onChange={(e) => handleVariationChange(index, 'stock', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="SKU"
                            value={variation.sku}
                            onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addVariation}>Add Variation</button>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default ProductForm;