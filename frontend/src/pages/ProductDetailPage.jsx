import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetailProducts } from "../middleware/api";
import defaultImg from "../assets/default-img.jpg";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchDetailProducts(id);
                setProduct(data);
            } catch (err) {
                setError("Product not found.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const formatRupiah = (value) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);

    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                        Loading...
                    </p>
                </div>
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                    <p className="body-md text-primary">{error || "Product not found."}</p>
                    <button
                        onClick={() => navigate("/catalog")}
                        className="label-md text-primary underline underline-offset-4"
                    >
                        Back to Catalog
                    </button>
                </div>
            </>
        );
    }

    const images = product.images?.length > 0 ? product.images : [null];
    const isOutOfStock = product.stock === 0;
    const attributes = product.attributes && typeof product.attributes === "object"
        ? Object.entries(product.attributes)
        : [];

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-12">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mb-10 label-sm" style={{ color: "var(--on-surface-variant)" }}>
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <a href="/catalog" className="hover:text-primary transition-colors">Catalog</a>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-primary">{product.name}</span>
                </nav>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                    {/* Images */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-4">
                        {/* Main image */}
                        <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: "var(--surface-container-low)" }}>
                            <img
                                src={images[selectedImage] || defaultImg}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`shrink-0 w-20 h-20 overflow-hidden transition-all ${
                                            selectedImage === i
                                                ? "ring-2 ring-primary ring-offset-2"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                        style={{ backgroundColor: "var(--surface-container-low)" }}
                                    >
                                        <img
                                            src={img || defaultImg}
                                            alt={`${product.name} ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-8">

                        {/* Category chip */}
                        <div>
                            <span
                                className="label-sm uppercase tracking-widest px-3 py-1 rounded-full"
                                style={{
                                    backgroundColor: "var(--surface-container)",
                                    color: "var(--on-surface-variant)",
                                }}
                            >
                                {product.category}
                            </span>
                        </div>

                        {/* Name & Price */}
                        <div className="flex flex-col gap-3">
                            <h1 className="display-lg text-primary leading-tight">{product.name}</h1>
                            <p className="headline-md text-primary">{formatRupiah(product.price)}</p>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-red-400" : "bg-green-500"}`}
                            />
                            <span className="label-sm" style={{ color: "var(--on-surface-variant)" }}>
                                {isOutOfStock ? "Out of Stock" : `${product.stock} in stock`}
                            </span>
                        </div>

                        {/* Divider */}
                        <div style={{ borderTop: "1px solid var(--outline-variant)" }} />

                        {/* Description */}
                        <div className="flex flex-col gap-3">
                            <h3 className="label-md uppercase tracking-widest text-primary">Description</h3>
                            <p className="body-md leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                                {product.description}
                            </p>
                        </div>

                        {/* Attributes */}
                        {attributes.length > 0 && (
                            <div className="flex flex-col gap-3">
                                {attributes.map(([key, value]) => (
                                    <div key={key}>
                                        <h3 className="label-md uppercase tracking-widest text-primary mb-2">
                                            {key}
                                        </h3>
                                        {Array.isArray(value) ? (
                                            <ul className="flex flex-col gap-1">
                                                {value.map((v, i) => (
                                                    <li
                                                        key={i}
                                                        className="body-md flex items-center gap-2"
                                                        style={{ color: "var(--on-surface-variant)" }}
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-current inline-block" />
                                                        {v}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                                                {String(value)}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Divider */}
                        <div style={{ borderTop: "1px solid var(--outline-variant)" }} />

                        {/* Quantity */}
                        <div className="flex flex-col gap-3">
                            <h3 className="label-md uppercase tracking-widest text-primary">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-surface-container"
                                    style={{ border: "1px solid var(--outline-variant)" }}
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">remove</span>
                                </button>
                                <span className="label-md text-primary w-6 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    disabled={quantity >= product.stock}
                                    className="w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-surface-container"
                                    style={{ border: "1px solid var(--outline-variant)" }}
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <button
                                    disabled={isOutOfStock}
                                    className="flex-1 py-4 label-md uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: "var(--primary)" }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="w-14 h-14 flex items-center justify-center rounded-none transition-colors hover:bg-surface-container"
                                    style={{ border: "1px solid var(--outline-variant)" }}
                                    title="Add to Wishlist"
                                >
                                    <span className="material-symbols-outlined text-primary text-[20px]">favorite_border</span>
                                </button>
                            </div>
                            <button
                                disabled={isOutOfStock}
                                className="w-full py-4 label-md uppercase tracking-widest text-primary transition-colors hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{ border: "1px solid var(--primary)" }}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Perks */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">local_shipping</span>
                                <div>
                                    <p className="label-sm text-primary">Free Shipping</p>
                                    <p className="label-sm" style={{ color: "var(--on-surface-variant)" }}>Orders over Rp 500.000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">verified</span>
                                <div>
                                    <p className="label-sm text-primary">Quality Assured</p>
                                    <p className="label-sm" style={{ color: "var(--on-surface-variant)" }}>Handcrafted durability</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}