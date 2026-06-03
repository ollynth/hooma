import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import NavBarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";
import { fetchUserProfile, updateUserProfile } from "../middleware/api";

const navItems = [
    { label: "Profile", icon: "person", href: "#profile" },
    { label: "Orders", icon: "package_2", href: "#orders" },
    { label: "Wishlist", icon: "favorite", href: "#wishlist" },
    { label: "Settings", icon: "settings", href: "#settings" },
];

const emptyAddress = {
    _id: null,
    label: "",
    type: "HOME",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    notes: "",
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [activeNav, setActiveNav] = useState("Profile");

    const handleLogout = () => {
            localStorage.removeItem('authToken');
            navigate('/sign-in'); // Redirect to login page
    };

    // Address modal state
    const [addressModal, setAddressModal] = useState({ open: false, data: null, index: null });
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, index: null });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                // fetchUserProfile returns { user: {...} }
                const u = data.user ?? data;
                setUser(u);
                setForm({
                    username: u.username,
                    firstName: u.profile?.firstName ?? "",
                    lastName: u.profile?.lastName ?? "",
                    phoneNumber: u.profile?.phoneNumber ?? "",
                });
                setAddresses(u.addresses ?? []);
            } catch (err) {
                setError("Failed to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleEdit = () => {
        setForm({
            username: user.username,
            firstName: user.profile?.firstName ?? "",
            lastName: user.profile?.lastName ?? "",
            phoneNumber: user.profile?.phoneNumber ?? "",
        });
        setAddresses(user.addresses ?? []);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm({
            username: user.username,
            firstName: user.profile?.firstName ?? "",
            lastName: user.profile?.lastName ?? "",
            phoneNumber: user.profile?.phoneNumber ?? "",
        });
        setAddresses(user.addresses ?? []);
        setIsEditing(false);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                username: form.username,
                profile: {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    phoneNumber: form.phoneNumber,
                },
                addresses,
            };
            const data = await updateUserProfile(payload);
            const updated = data.user ?? data;
            setUser(updated);
            setAddresses(updated.addresses ?? []);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to save changes. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleFormChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Address CRUD
    const openAddAddress = () => {
        setAddressModal({ open: true, data: { ...emptyAddress, _id: Date.now().toString() }, index: null });
    };

    const openEditAddress = (idx) => {
        setAddressModal({ open: true, data: { ...addresses[idx] }, index: idx });
    };

    const handleAddressSave = () => {
        const { data, index } = addressModal;
        if (index === null) {
            setAddresses((prev) => [...prev, data]);
        } else {
            setAddresses((prev) => prev.map((a, i) => (i === index ? data : a)));
        }
        setAddressModal({ open: false, data: null, index: null });
    };

    const handleAddressDelete = (idx) => {
        setDeleteConfirm({ open: true, index: idx });
    };

    const confirmDelete = () => {
        setAddresses((prev) => prev.filter((_, i) => i !== deleteConfirm.index));
        setDeleteConfirm({ open: false, index: null });
    };

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "";

    if (loading) {
        return (
            <>
                <NavBarTop />
                <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--surface)" }}>
                    <p className="body-md" style={{ color: "var(--on-surface-variant)" }}>Loading profile...</p>
                </main>
                <FooterFull />
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBarTop />
                <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--surface)" }}>
                    <p className="body-md" style={{ color: "var(--error)" }}>{error}</p>
                </main>
                <FooterFull />
            </>
        );
    }

    return (
        <>
            <NavBarTop />

            <main className="min-h-screen w-full" style={{ backgroundColor: "var(--surface)" }}>
                <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 py-16">

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                        {/* Sidebar */}
                        <aside className="lg:w-56 flex-shrink-0">
                            {/* Avatar + name */}
                            <div className="flex flex-col items-center text-center mb-10 p-6 rounded-lg" style={{ backgroundColor: "var(--surface-container-low)" }}>
                                <div className="relative mb-4">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold" style={{ backgroundColor: "var(--primary-container)", color: "var(--on-primary-container)" }}>
                                        {user.profile.firstName?.[0]}{user.profile.lastName?.[0]}
                                    </div>
                                    <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>edit</span>
                                    </button>
                                </div>
                                <p className="label-md" style={{ color: "var(--primary)" }}>{user.profile.firstName} {user.profile.lastName}</p>
                                <p className="label-sm mt-1" style={{ color: "var(--on-surface-variant)" }}>Member since {memberSince}</p>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-col gap-1 mb-8">
                                {navItems.map(({ label, icon, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        onClick={() => setActiveNav(label)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg label-md transition-colors duration-200"
                                        style={{
                                            color: activeNav === label ? "var(--primary)" : "var(--on-surface-variant)",
                                            backgroundColor: activeNav === label ? "var(--surface-container)" : "transparent",
                                            borderLeft: activeNav === label ? "2px solid var(--primary)" : "2px solid transparent",
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{icon}</span>
                                        {label}
                                    </a>
                                ))}
                            </nav>

                            <div className="pt-4" style={{ borderTop: "1px solid var(--outline-variant)" }}>
                                <button className="flex items-center gap-3 px-4 py-3 label-md w-full rounded-lg transition-colors duration-200 hover:opacity-70"  onClick={handleLogout} style={{ color: "var(--error)" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </aside>

                        {/* Main content */}
                        <div className="flex-1 min-w-0">

                            {/* Profile header */}
                            <div className="flex items-center justify-between mb-8 pb-6" style={{ borderBottom: "1px solid var(--outline-variant)" }}>
                                <h2 className="headline-md" style={{ color: "var(--primary)" }}>Profile</h2>
                            </div>

                            {/* Personal Info + Security two-col */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">

                                {/* Personal Information */}
                                <div>
                                    <h3 className="label-md uppercase tracking-widest mb-6" style={{ color: "var(--secondary)" }}>Personal Information</h3>

                                    <div className="flex flex-col gap-5">
                                        <Field
                                            label="Username"
                                            name="username"
                                            value={isEditing ? form.username : user.username}
                                            isEditing={isEditing}
                                            onChange={handleFormChange}
                                        />
                                        <Field
                                            label="First Name"
                                            name="firstName"
                                            value={isEditing ? form.firstName : user.profile.firstName}
                                            isEditing={isEditing}
                                            onChange={handleFormChange}
                                        />
                                        <Field
                                            label="Last Name"
                                            name="lastName"
                                            value={isEditing ? form.lastName : user.profile.lastName}
                                            isEditing={isEditing}
                                            onChange={handleFormChange}
                                        />
                                        <Field
                                            label="Phone Number"
                                            name="phoneNumber"
                                            value={isEditing ? form.phoneNumber : user.profile.phoneNumber}
                                            isEditing={isEditing}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                </div>

                                {/* Security */}
                                <div>
                                    <h3 className="label-md uppercase tracking-widest mb-6" style={{ color: "var(--secondary)" }}>Security</h3>

                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <p className="label-sm uppercase tracking-widest mb-2" style={{ color: "var(--on-surface-variant)" }}>Email Address</p>
                                            <p className="body-md" style={{ color: "var(--primary)" }}>{user.email}</p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                className="flex items-center justify-between w-full px-5 py-4 rounded-lg label-md transition-colors duration-200"
                                                style={{ backgroundColor: "var(--surface-container-low)", color: "var(--primary)", border: "1px solid var(--outline-variant)" }}
                                            >
                                                <span>Update Password</span>
                                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
                                            </button>
                                            <p className="label-sm mt-2" style={{ color: "var(--on-surface-variant)" }}>Last changed 4 months ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Book */}
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="label-md uppercase tracking-widest" style={{ color: "var(--primary)" }}>Address Book</h3>
                                    {isEditing && (
                                        <button
                                            onClick={openAddAddress}
                                            className="flex items-center gap-2 label-sm uppercase tracking-widest transition-opacity hover:opacity-70"
                                            style={{ color: "var(--primary)" }}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>add</span>
                                            Add New Address
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {addresses.map((addr, idx) => (
                                        <div
                                            key={addr._id}
                                            className="relative p-6 rounded-lg"
                                            style={{ backgroundColor: "var(--surface-container-low)", border: "1px solid var(--outline-variant)" }}
                                        >
                                            {/* Badge */}
                                            <span
                                                className="inline-block label-sm px-2 py-0.5 rounded mb-3 uppercase tracking-widest"
                                                style={{ backgroundColor: "var(--surface-container-high)", color: "var(--on-surface-variant)" }}
                                            >
                                                {addr.type}
                                            </span>

                                            {isEditing && (
                                                <div className="absolute top-4 right-4 flex gap-2">
                                                    <button
                                                        onClick={() => openEditAddress(idx)}
                                                        className="material-symbols-outlined hover:opacity-60 transition-opacity"
                                                        style={{ fontSize: "18px", color: "var(--on-surface-variant)" }}
                                                    >edit</button>
                                                    <button
                                                        onClick={() => handleAddressDelete(idx)}
                                                        className="material-symbols-outlined hover:opacity-60 transition-opacity"
                                                        style={{ fontSize: "18px", color: "var(--error)" }}
                                                    >delete</button>
                                                </div>
                                            )}

                                            <h4 className="headline-md mb-2" style={{ color: "var(--primary)" }}>{addr.label || "Address"}</h4>
                                            <p className="body-md" style={{ color: "var(--on-surface-variant)", lineHeight: "1.7" }}>
                                                {addr.street}<br />
                                                {addr.city}, {addr.state} {addr.zipCode}<br />
                                                {addr.country}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer actions */}
                            <div
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6"
                                style={{ borderTop: "1px solid var(--outline-variant)" }}
                            >
                                <p className="body-md max-w-sm" style={{ color: "var(--on-surface-variant)", fontStyle: "italic", fontSize: "13px" }}>
                                    Your personal data will be used to support your experience throughout this website, to manage access to your account.
                                </p>

                                <div className="flex gap-3">
                                    {isEditing && (
                                        <button
                                            onClick={handleCancel}
                                            className="label-md px-8 py-3 rounded-lg transition-colors duration-200 uppercase tracking-widest"
                                            style={{ backgroundColor: "var(--surface-container-low)", color: "var(--primary)", border: "1px solid var(--outline-variant)" }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        onClick={isEditing ? handleSave : handleEdit}
                                        disabled={saving}
                                        className="label-md px-8 py-3 rounded-lg transition-opacity duration-200 hover:opacity-85 uppercase tracking-widest"
                                        style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)", opacity: saving ? 0.6 : 1 }}
                                    >
                                        {saving ? "Saving..." : isEditing ? "Save Changes" : "Update Profile"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* Address Modal */}
            {addressModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <div className="w-full max-w-lg rounded-xl p-8" style={{ backgroundColor: "var(--surface-container-lowest)" }}>
                        <h3 className="headline-md mb-6" style={{ color: "var(--primary)" }}>
                            {addressModal.index === null ? "Add New Address" : "Edit Address"}
                        </h3>

                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <ModalField
                                    label="Label (e.g. Home)"
                                    value={addressModal.data.label}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, label: v } }))}
                                />
                                <ModalField
                                    label="Type (PRIMARY / OFFICE)"
                                    value={addressModal.data.type}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, type: v } }))}
                                />
                            </div>
                            <ModalField
                                label="Street"
                                value={addressModal.data.street}
                                onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, street: v } }))}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <ModalField
                                    label="City"
                                    value={addressModal.data.city}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, city: v } }))}
                                />
                                <ModalField
                                    label="State"
                                    value={addressModal.data.state}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, state: v } }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <ModalField
                                    label="Zip Code"
                                    value={addressModal.data.zipCode}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, zipCode: v } }))}
                                />
                                <ModalField
                                    label="Country"
                                    value={addressModal.data.country}
                                    onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, country: v } }))}
                                />
                            </div>
                            <ModalField
                                label="Notes (optional)"
                                value={addressModal.data.notes}
                                onChange={(v) => setAddressModal((prev) => ({ ...prev, data: { ...prev.data, notes: v } }))}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setAddressModal({ open: false, data: null, index: null })}
                                className="label-md px-6 py-3 rounded-lg uppercase tracking-widest"
                                style={{ backgroundColor: "var(--surface-container-low)", color: "var(--primary)", border: "1px solid var(--outline-variant)" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddressSave}
                                className="label-md px-6 py-3 rounded-lg uppercase tracking-widest"
                                style={{ backgroundColor: "var(--primary)", color: "var(--on-primary)" }}
                            >
                                Save Address
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation */}
            {deleteConfirm.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                    <div className="w-full max-w-sm rounded-xl p-8 text-center" style={{ backgroundColor: "var(--surface-container-lowest)" }}>
                        <span className="material-symbols-outlined mb-4 block" style={{ fontSize: "36px", color: "var(--error)" }}>delete</span>
                        <h3 className="headline-md mb-2" style={{ color: "var(--primary)" }}>Remove Address?</h3>
                        <p className="body-md mb-8" style={{ color: "var(--on-surface-variant)" }}>This address will be permanently removed from your account.</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setDeleteConfirm({ open: false, index: null })}
                                className="label-md px-6 py-3 rounded-lg uppercase tracking-widest"
                                style={{ backgroundColor: "var(--surface-container-low)", color: "var(--primary)", border: "1px solid var(--outline-variant)" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="label-md px-6 py-3 rounded-lg uppercase tracking-widest"
                                style={{ backgroundColor: "var(--error)", color: "var(--on-error)" }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <FooterFull />
            <Footer />
        </>
    );
}

// Reusable read/edit field
function Field({ label, name, value, isEditing, onChange }) {
    return (
        <div>
            <p className="label-sm uppercase tracking-widest mb-2" style={{ color: "var(--on-surface-variant)" }}>{label}</p>
            {isEditing ? (
                <input
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    className="w-full bg-transparent body-md px-0 py-2 outline-none"
                    style={{
                        color: "var(--primary)",
                        borderBottom: "1px solid var(--primary)",
                    }}
                />
            ) : (
                <p className="body-md py-2" style={{ color: "var(--primary)", borderBottom: "1px solid var(--outline-variant)" }}>
                    {value || <span style={{ color: "var(--on-surface-variant)" }}>—</span>}
                </p>
            )}
        </div>
    );
}

// Simple input for modal
function ModalField({ label, value, onChange }) {
    return (
        <div>
            <p className="label-sm uppercase tracking-widest mb-1" style={{ color: "var(--on-surface-variant)" }}>{label}</p>
            <input
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent body-md px-0 py-2 outline-none"
                style={{ color: "var(--primary)", borderBottom: "1px solid var(--outline-variant)" }}
            />
        </div>
    );
}