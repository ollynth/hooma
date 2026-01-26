// src/components/ProductCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { deleteProduct } from '../api';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
            await deleteProduct(product._id);
            window.location.reload();
    };

    return (
        <div class="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-all duration-200">
            <Link to={`/product/${product._id}`}>
                <figure>
                    <img src={`http://localhost:4001${product.defaultImage}`} alt={product.name} className="card-img-top" />
                </figure>
            </Link>
                <div class="card-body">
                    <h2 class="card-title">{product.name}</h2>
                    <p>${product.price.toFixed(2)}</p>
                    <div class="card-actions justify-end">
                        <button onClick={() => navigate(`/edit/${product._id}`)} className="btn btn-ghost btn-xs text-primary">                                       
                            <PenSquareIcon className="size-6" />
                        </button>
                        <button onClick={handleDelete} className="btn btn-ghost btn-xs text-error">                                       
                            <Trash2Icon className="size-6" />
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default ProductCard;