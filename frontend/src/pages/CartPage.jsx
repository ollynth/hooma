import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart, updateCartItem, deleteCartItem } from "../middleware/api";
import defaultImg from "../assets/default-img.jpg";

const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyCart({ isLoggedIn }) {
    const navigate = useNavigate();
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--surface-container)" }}
            >
                <span className="material-symbols-outlined text-[36px]" style={{ color: "var(--on-surface-variant)" }}>
                    shopping_bag
                </span>
            </div>

            <div className="flex flex-col gap-3 max-w-md">
                <h2 className="headline-lg text-primary">A space waiting for your selections.</h2>
                <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                    {isLoggedIn
                        ? "Your cart is currently empty. Our collection of artisanal, slow-made pieces is ready to transform your home into a sanctuary of calm."
                        : "Please sign in to view your cart and continue shopping your curated selection."}
                </p>
            </div>

            {isLoggedIn ? (
                <button
                    onClick={() => navigate("/catalog")}
                    className="label-md uppercase tracking-widest px-10 py-4 text-background hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    Explore Collection
                </button>
            ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate("/sign-in")}
                        className="label-md uppercase tracking-widest px-10 py-4 text-background hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/sign-up")}
                        className="label-md uppercase tracking-widest px-10 py-4 text-primary hover:bg-surface-container transition-colors"
                        style={{ border: "1px solid var(--primary)" }}
                    >
                        Create Account
                    </button>
                </div>
            )}
        </div>
    );
}

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItem({ item, selected, onToggle, onQuantityChange, onRemove }) {
    const [removing, setRemoving] = useState(false);

    const handleRemove = async () => {
        setRemoving(true);
        await onRemove(item.product._id);
    };

    const price = item.product.salePrice || item.product.price;

    return (
        <div
            className={`flex gap-5 py-6 transition-opacity duration-300 ${removing ? "opacity-0" : "opacity-100"}`}
            style={{ borderBottom: "1px solid var(--outline-variant)" }}
        >
            {/* Checkbox */}
            <div className="flex items-start pt-1">
                <button
                    onClick={() => onToggle(item.product._id)}
                    className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{
                        border: "1.5px solid var(--outline)",
                        backgroundColor: selected ? "var(--primary)" : "transparent",
                    }}
                    aria-label="Select item"
                >
                    {selected && (
                        <span className="material-symbols-outlined text-[14px] text-background">check</span>
                    )}
                </button>
            </div>

            {/* Image */}
            <div
                className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: "var(--surface-container-low)" }}
            >
                <img
                    src={item.product.images?.[0] || defaultImg}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <p className="label-sm uppercase tracking-widest mb-1" style={{ color: "var(--on-surface-variant)" }}>
                            {item.product.category}
                        </p>
                        <h4 className="headline-md text-primary leading-tight">{item.product.name}</h4>
                        <p className="label-sm mt-1 line-clamp-1" style={{ color: "var(--on-surface-variant)" }}>
                            {item.product.description}
                        </p>
                    </div>
                    <span className="label-md text-primary flex-shrink-0">{formatRupiah(price * item.quantity)}</span>
                </div>

                {/* Quantity & Remove */}
                <div className="flex items-center justify-between mt-2">
                    <div
                        className="flex items-center gap-3 px-3 py-1.5"
                        style={{ border: "1px solid var(--outline-variant)" }}
                    >
                        <button
                            onClick={() => onQuantityChange(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center disabled:opacity-30 hover:opacity-70 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-[16px] text-primary">remove</span>
                        </button>
                        <span className="label-md text-primary w-5 text-center">{item.quantity}</span>
                        <button
                            onClick={() => onQuantityChange(item.product._id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-6 flex items-center justify-center disabled:opacity-30 hover:opacity-70 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-[16px] text-primary">add</span>
                        </button>
                    </div>

                    <button
                        onClick={handleRemove}
                        className="flex items-center gap-1.5 label-sm hover:opacity-60 transition-opacity"
                        style={{ color: "var(--on-surface-variant)" }}
                    >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main CartPage ────────────────────────────────────────────────────────────

export default function CartPage() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("authToken");

    const [cartItems, setCartItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        const load = async () => {
            try {
                const data = await fetchCart();
                const rawItems = Array.isArray(data) ? data : (data.items || []);
                const items = rawItems.map((i) => ({
                    ...i,
                    product: i.productId, 
                }));
                setCartItems(items);
                setSelectedIds(new Set(items.map((i) => i.product._id)));
            } catch (err) {
                setError("Failed to load cart.");
                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [isLoggedIn]);

    const toggleSelect = (id) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === cartItems.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(cartItems.map((i) => i.product._id)));
        }
    };

    const handleQuantityChange = async (productId, newQty) => {
        if (newQty < 1) return;
        try {
            await updateCartItem(productId, newQty);
            setCartItems((prev) =>
                prev.map((item) =>
                    item.product._id === productId ? { ...item, quantity: newQty } : item
                )
            );
        } catch(error) {
            console.error("Error updating cart item:", error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await deleteCartItem([productId]);
            setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
            setSelectedIds((prev) => {
                const next = new Set(prev);
                next.delete(productId);
                return next;
            });
        } catch(error) {
            console.error("Error removing cart item:", error);
        }
    };

    // Order summary calculations
    const SHIPPING_FLAT = 50000;
    const TAX_RATE = 0.11;

    const selectedItems = cartItems.filter((i) => selectedIds.has(i.product._id));
    const subtotal = selectedItems.reduce((sum, i) => {
        const price = i.product.salePrice || i.product.price;
        return sum + price * i.quantity;
    }, 0);
    const shipping = selectedItems.length > 0 ? SHIPPING_FLAT : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>Loading...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-14">

                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="display-lg text-primary mb-2">Your Cart</h1>
                    {isLoggedIn && cartItems.length > 0 && (
                        <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                            You have {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart, thoughtfully selected for your home.
                        </p>
                    )}
                </div>

                {/* Content */}
                {!isLoggedIn || cartItems.length === 0 || error ? (
                    <EmptyCart isLoggedIn={isLoggedIn} />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

                        {/* Items Column */}
                        <div className="w-full lg:flex-1">

                            {/* Select All */}
                            <button
                                onClick={toggleSelectAll}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div
                                    className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-colors"
                                    style={{
                                        border: "1.5px solid var(--outline)",
                                        backgroundColor:
                                            selectedIds.size === cartItems.length
                                                ? "var(--primary)"
                                                : "transparent",
                                    }}
                                >
                                    {selectedIds.size === cartItems.length && (
                                        <span className="material-symbols-outlined text-[14px] text-background">check</span>
                                    )}
                                </div>
                                <span className="label-md uppercase tracking-widest text-primary">
                                    Select All ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})
                                </span>
                            </button>

                            {/* Items */}
                            <div>
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.product._id}
                                        item={item}
                                        selected={selectedIds.has(item.product._id)}
                                        onToggle={toggleSelect}
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={handleRemove}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div
                            className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 p-8 sticky top-28"
                            style={{ backgroundColor: "var(--surface-container-lowest)", border: "1px solid var(--outline-variant)" }}
                        >
                            <h3 className="headline-md text-primary mb-6">Order Summary</h3>

                            <div className="flex flex-col gap-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="body-md" style={{ color: "var(--on-surface-variant)" }}>Subtotal</span>
                                    <span className="label-md text-primary">{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="body-md" style={{ color: "var(--on-surface-variant)" }}>Estimated Shipping</span>
                                    <span className="label-md text-primary">{formatRupiah(shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="body-md" style={{ color: "var(--on-surface-variant)" }}>Estimated Tax (11%)</span>
                                    <span className="label-md text-primary">{formatRupiah(tax)}</span>
                                </div>
                            </div>

                            <div
                                className="flex justify-between py-4 mb-6"
                                style={{ borderTop: "1px solid var(--outline-variant)" }}
                            >
                                <span className="headline-md text-primary">Total</span>
                                <span className="headline-md text-primary">{formatRupiah(total)}</span>
                            </div>

                            <button
                                disabled={selectedIds.size === 0}
                                onClick={() => navigate("/checkout")}
                                className="w-full py-4 label-md uppercase tracking-widest text-background hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mb-3"
                                style={{ backgroundColor: "var(--primary)" }}
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate("/catalog")}
                                className="w-full py-3 label-sm uppercase tracking-widest text-primary hover:opacity-60 transition-opacity"
                            >
                                Continue Shopping
                            </button>

                            {/* Sustainability note */}
                            <div
                                className="mt-6 flex items-start gap-3 p-4 rounded"
                                style={{ backgroundColor: "var(--surface-container)" }}
                            >
                                <span className="material-symbols-outlined text-[18px] mt-0.5 flex-shrink-0" style={{ color: "var(--on-surface-variant)" }}>
                                    eco
                                </span>
                                <p className="label-sm" style={{ color: "var(--on-surface-variant)" }}>
                                    Your order supports sustainable workshops and artisan livelihoods.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </>
    );
}