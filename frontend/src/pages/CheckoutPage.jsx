import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultImg from "../assets/default-img.jpg";
import { previewOrder, createOrder } from "../middleware/api";

const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);

const SHIPPING_FLAT = 50000;
const TAX_RATE = 0.11;

// Payment methods must match Order model enum exactly
const PAYMENT_METHODS = [
    { id: "Credit Card",     label: "Credit Card",    icon: "credit_card" },
    { id: "Debit Card",      label: "Debit Card",     icon: "credit_score" },
    { id: "Virtual Account", label: "Virtual Account",icon: "account_balance" },
    { id: "QRIS",            label: "QRIS",           icon: "qr_code_2" },
];

// ─── Input ────────────────────────────────────────────────────────────────────

function Field({ label, value, onChange, placeholder, type = "text", disabled = false, half = false }) {
    return (
        <div className={`flex flex-col gap-1 ${half ? "flex-1 min-w-0" : "w-full"}`}>
            <label className="label-sm uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="body-md text-primary bg-transparent outline-none py-3 disabled:opacity-50"
                style={{ borderBottom: "1px solid var(--outline-variant)" }}
            />
        </div>
    );
}

// ─── Address Card ─────────────────────────────────────────────────────────────

function AddressCard({ address, selected, onSelect, label }) {
    return (
        <button
            onClick={onSelect}
            className="flex flex-col gap-2 p-4 text-left transition-all duration-200 w-full"
            style={{
                border: selected
                    ? "1.5px solid var(--primary)"
                    : "1px solid var(--outline-variant)",
                backgroundColor: selected ? "var(--surface-container-low)" : "transparent",
            }}
        >
            <div className="flex items-center justify-between">
                <span className="label-sm uppercase tracking-widest text-primary">{label}</span>
                {selected && (
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                )}
            </div>
            {address ? (
                <>
                    <p className="label-md text-primary">{address.recipientName || ""}</p>
                    <p className="label-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                        {address.street}, {address.city}, {address.state} {address.zipCode}
                    </p>
                </>
            ) : (
                <div className="flex items-center gap-2 mt-1" style={{ color: "var(--on-surface-variant)" }}>
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span className="label-sm uppercase tracking-widest">Use a New Address</span>
                </div>
            )}
        </button>
    );
}

// ─── Order Item Row ───────────────────────────────────────────────────────────

function OrderItem({ item }) {
    return (
        <div className="flex gap-4 py-4" style={{ borderBottom: "1px solid var(--outline-variant)" }}>
            <div
                className="w-16 h-16 flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: "var(--surface-container)" }}
            >
                <img
                    src={item.image || defaultImg}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                <p className="label-md text-primary leading-tight line-clamp-2">{item.name}</p>
                <p className="label-sm" style={{ color: "var(--on-surface-variant)" }}>Qty: {item.quantity}</p>
                <p className="label-md text-primary">{formatRupiah(item.subtotal)}</p>
            </div>
        </div>
    );
}

// ─── Main CheckoutPage ────────────────────────────────────────────────────────

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state can carry { productIds } from CartPage or { buyNow, productId, quantity } from ProductDetailPage
    const checkoutState = location.state || {};

    const [preview, setPreview] = useState(null);
    const [loadingPreview, setLoadingPreview] = useState(true);
    const [previewError, setPreviewError] = useState(null);

    // Address state
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); // index into preview.customerInfo.addresses; -1 = new
    const [newAddress, setNewAddress] = useState({
        recipientName: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Indonesia",
        notes: "",
    });

    // Payment state
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");

    // Submission
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // ── Fetch preview ────────────────────────────────────────────────────────
    useEffect(() => {
        const fetchPreview = async () => {
            try {
                const body = checkoutState.buyNow
                    ? { buyNow: true, productId: checkoutState.productId, quantity: checkoutState.quantity }
                    : { productIds: checkoutState.productIds };

                const data = await previewOrder(body);
                setPreview(data);

                // Pre-select first saved address if exists
                if (data.customerInfo?.addresses?.length > 0) {
                    setSelectedAddressIndex(0);
                    const first = data.customerInfo.addresses[0];
                    setNewAddress({
                        recipientName: data.customerInfo.name || "",
                        street: first.street || "",
                        city: first.city || "",
                        state: first.state || "",
                        zipCode: first.zipCode || "",
                        country: first.country || "Indonesia",
                        notes: first.notes || "",
                    });
                } else {
                    setSelectedAddressIndex(-1); // force new address form
                    setNewAddress((prev) => ({
                        ...prev,
                        recipientName: data.customerInfo?.name || "",
                    }));
                }
            } catch (err) {
                setPreviewError(err.response?.data?.message || "Failed to load order preview.");
            } finally {
                setLoadingPreview(false);
            }
        };
        fetchPreview();
    }, []);

    const handleSelectAddress = (index) => {
        setSelectedAddressIndex(index);
        if (index === -1) {
            setNewAddress({
                recipientName: preview?.customerInfo?.name || "",
                street: "", city: "", state: "", zipCode: "", country: "Indonesia", notes: "",
            });
        } else {
            const addr = preview.customerInfo.addresses[index];
            setNewAddress({
                recipientName: preview.customerInfo.name || "",
                street: addr.street || "",
                city: addr.city || "",
                state: addr.state || "",
                zipCode: addr.zipCode || "",
                country: addr.country || "Indonesia",
                notes: addr.notes || "",
            });
        }
    };

    // ── Submit order ─────────────────────────────────────────────────────────
    const handleCreateOrder = async () => {
        if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode || !newAddress.country) {
            setSubmitError("Please complete all required address fields.");
            return;
        }

        setSubmitting(true);
        setSubmitError(null);

        try {
            const body = {
                shippingAddress: {
                    street: newAddress.street,
                    city: newAddress.city,
                    state: newAddress.state,
                    zipCode: newAddress.zipCode,
                    country: newAddress.country,
                    notes: newAddress.notes,
                },
                paymentMethod,
                ...(checkoutState.buyNow
                    ? { buyNow: true, productId: checkoutState.productId, quantity: checkoutState.quantity }
                    : { productIds: checkoutState.productIds }),
            };

            const data = await createOrder(body);
            navigate("/orders/" + data.order._id);
        } catch (err) {
            setSubmitError(err.response?.data?.message || "Failed to place order.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Derived totals ───────────────────────────────────────────────────────
    const subtotal = preview?.totalAmount || 0;
    const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    // ── Loading / Error states ───────────────────────────────────────────────
    if (loadingPreview) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>Preparing your order...</p>
                </div>
            </>
        );
    }

    if (previewError) {
        return (
            <>
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                    <p className="body-md text-primary">{previewError}</p>
                    <button onClick={() => navigate("/cart")} className="label-md text-primary underline underline-offset-4">
                        Back to Cart
                    </button>
                </div>
            </>
        );
    }

    const savedAddresses = preview?.customerInfo?.addresses || [];

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 py-14">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="display-lg text-primary mb-2">Checkout</h1>
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                        Review your selection and provide shipping details for your curated home.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">

                    {/* ── Left: Shipping + Payment ────────────────────────── */}
                    <div className="w-full lg:flex-1 flex flex-col gap-12">

                        {/* Shipping */}
                        <section className="flex flex-col gap-6">
                            <h2 className="headline-md text-primary">Shipping Information</h2>

                            {/* Saved addresses */}
                            {savedAddresses.length > 0 && (
                                <div>
                                    <p className="label-sm uppercase tracking-widest mb-4" style={{ color: "var(--on-surface-variant)" }}>
                                        Saved Addresses
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {savedAddresses.map((addr, i) => (
                                            <AddressCard
                                                key={i}
                                                address={addr}
                                                label={addr.label || `Address ${i + 1}`}
                                                selected={selectedAddressIndex === i}
                                                onSelect={() => handleSelectAddress(i)}
                                            />
                                        ))}
                                        <AddressCard
                                            address={null}
                                            label="New"
                                            selected={selectedAddressIndex === -1}
                                            onSelect={() => handleSelectAddress(-1)}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Address form */}
                            <div className="flex flex-col gap-5">
                                <Field
                                    label="Full Name"
                                    value={newAddress.recipientName}
                                    onChange={(v) => setNewAddress((p) => ({ ...p, recipientName: v }))}
                                    placeholder="e.g. Julianne Sterling"
                                />
                                <Field
                                    label="Address"
                                    value={newAddress.street}
                                    onChange={(v) => setNewAddress((p) => ({ ...p, street: v }))}
                                    placeholder="Street Address, Apartment, Suite"
                                />
                                <div className="flex gap-4">
                                    <Field
                                        label="City"
                                        value={newAddress.city}
                                        onChange={(v) => setNewAddress((p) => ({ ...p, city: v }))}
                                        placeholder="City"
                                        half
                                    />
                                    <Field
                                        label="State / Province"
                                        value={newAddress.state}
                                        onChange={(v) => setNewAddress((p) => ({ ...p, state: v }))}
                                        placeholder="State"
                                        half
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Field
                                        label="ZIP / Postal Code"
                                        value={newAddress.zipCode}
                                        onChange={(v) => setNewAddress((p) => ({ ...p, zipCode: v }))}
                                        placeholder="ZIP"
                                        half
                                    />
                                    <Field
                                        label="Country"
                                        value={newAddress.country}
                                        onChange={(v) => setNewAddress((p) => ({ ...p, country: v }))}
                                        placeholder="Country"
                                        half
                                    />
                                </div>
                                <Field
                                    label="Delivery Notes (optional)"
                                    value={newAddress.notes}
                                    onChange={(v) => setNewAddress((p) => ({ ...p, notes: v }))}
                                    placeholder="Leave at door, ring bell, etc."
                                />
                            </div>
                        </section>

                        {/* Divider */}
                        <div style={{ borderTop: "1px solid var(--outline-variant)" }} />

                        {/* Payment Method */}
                        <section className="flex flex-col gap-6">
                            <h2 className="headline-md text-primary">Payment Method</h2>
                            <p className="label-sm" style={{ color: "var(--on-surface-variant)" }}>
                                Payment gateway integration is coming soon. Select your preferred method to continue.
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                {PAYMENT_METHODS.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className="flex items-center gap-3 px-4 py-4 text-left transition-all duration-200"
                                        style={{
                                            border: paymentMethod === method.id
                                                ? "1.5px solid var(--primary)"
                                                : "1px solid var(--outline-variant)",
                                            backgroundColor: paymentMethod === method.id
                                                ? "var(--surface-container-low)"
                                                : "transparent",
                                        }}
                                    >
                                        <span
                                            className="material-symbols-outlined text-[20px]"
                                            style={{ color: paymentMethod === method.id ? "var(--primary)" : "var(--on-surface-variant)" }}
                                        >
                                            {method.icon}
                                        </span>
                                        <span
                                            className="label-md uppercase tracking-widest"
                                            style={{ color: paymentMethod === method.id ? "var(--primary)" : "var(--on-surface-variant)" }}
                                        >
                                            {method.label}
                                        </span>
                                        {paymentMethod === method.id && (
                                            <span className="material-symbols-outlined text-[16px] text-primary ml-auto">check_circle</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Placeholder card UI — shown for card methods */}
                            {(paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
                                <div
                                    className="flex flex-col gap-5 p-6 mt-2"
                                    style={{ border: "1px solid var(--outline-variant)", backgroundColor: "var(--surface-container-low)" }}
                                >
                                    <p className="label-sm uppercase tracking-widest" style={{ color: "var(--on-surface-variant)" }}>
                                        Card Details — Coming Soon
                                    </p>
                                    <Field label="Card Number" value="" onChange={() => {}} placeholder="0000 0000 0000 0000" disabled />
                                    <div className="flex gap-4">
                                        <Field label="Expiry Date" value="" onChange={() => {}} placeholder="MM / YY" disabled half />
                                        <Field label="CVC" value="" onChange={() => {}} placeholder="123" disabled half />
                                    </div>
                                </div>
                            )}

                            {(paymentMethod === "Virtual Account") && (
                                <div
                                    className="flex items-start gap-3 p-5 mt-2"
                                    style={{ border: "1px solid var(--outline-variant)", backgroundColor: "var(--surface-container-low)" }}
                                >
                                    <span className="material-symbols-outlined text-[20px] mt-0.5" style={{ color: "var(--on-surface-variant)" }}>info</span>
                                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                                        A virtual account number will be generated after you place your order. Payment gateway integration coming soon.
                                    </p>
                                </div>
                            )}

                            {paymentMethod === "QRIS" && (
                                <div
                                    className="flex items-start gap-3 p-5 mt-2"
                                    style={{ border: "1px solid var(--outline-variant)", backgroundColor: "var(--surface-container-low)" }}
                                >
                                    <span className="material-symbols-outlined text-[20px] mt-0.5" style={{ color: "var(--on-surface-variant)" }}>qr_code_scanner</span>
                                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>
                                        A QRIS code will be displayed after placing your order. Payment gateway integration coming soon.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* ── Right: Order Summary ─────────────────────────────── */}
                    <div
                        className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 p-8 sticky top-28"
                        style={{
                            backgroundColor: "var(--surface-container-lowest)",
                            border: "1px solid var(--outline-variant)",
                        }}
                    >
                        <h3 className="headline-md text-primary mb-6">Order Summary</h3>

                        {/* Items */}
                        <div className="mb-4">
                            {preview?.items?.map((item) => (
                                <OrderItem key={item.productId} item={item} />
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col gap-3 mb-5">
                            <div className="flex justify-between">
                                <span className="body-md" style={{ color: "var(--on-surface-variant)" }}>Subtotal</span>
                                <span className="label-md text-primary">{formatRupiah(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="body-md" style={{ color: "var(--on-surface-variant)" }}>Shipping</span>
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

                        {submitError && (
                            <p className="label-sm mb-4" style={{ color: "var(--error)" }}>{submitError}</p>
                        )}

                        <button
                            onClick={handleCreateOrder}
                            disabled={submitting}
                            className="w-full flex items-center justify-center gap-2 py-4 label-md uppercase tracking-widest text-background hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ backgroundColor: "var(--primary)" }}
                        >
                            {submitting ? "Placing Order..." : "Create Order"}
                            {!submitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
                        </button>

                        <p className="label-sm text-center mt-4" style={{ color: "var(--on-surface-variant)" }}>
                            By placing your order you agree to our terms and conditions.
                        </p>
                    </div>

                </div>
            </main>
        </>
    );
}