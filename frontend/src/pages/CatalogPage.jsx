import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import { fetchProducts } from "../middleware/api";
import img from "../assets/default-img.jpg";

export default function CatalogPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [priceRange, setPriceRange] = useState([0, 10000000]);

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleMinInputChange = (e) => {
        const value = Number(e.target.value.replace(/\D/g, ""));

        setPriceRange([
            Math.min(value, priceRange[1]),
            priceRange[1],
        ]);
    };

    const handleMaxInputChange = (e) => {
        const value = Number(e.target.value.replace(/\D/g, ""));

        setPriceRange([
            priceRange[0],
            Math.max(value, priceRange[0]),
        ]);
    };

    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        );
    });

    const productsPerPage = 6;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>

            <main className="max-w-7xl mx-auto py-20 sm:px-8 lg:px-14">
                {/* Header */}
                <section className="mb-20 text-center flex flex-col">
                    <h1 className="display-lg mb-4 text-primary">Our Collection</h1>
                    <p className="body-lg leading-relaxed text-center"style={{color: "var(--on-surface-variant)",}}> Curated essentials for the intentional home.</p>
                </section>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <aside class="w-full md:w-64 shrink-0">
                      <div class="sticky top-32 space-y-10">
                          {/* categories */}
                          <div>
                          <h3 class="label-md label-md uppercase tracking-widest mb-6 text-primary">Categories</h3>
                          <ul class="space-y-4">
                              <li class="flex items-center justify-between group cursor-pointer">
                                  <span class="body-md text-primary">Furniture</span>
                                  <span class="label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>(12)</span>
                              </li>
                              <li class="flex items-center justify-between group cursor-pointer">
                                  <span class="body-md group-hover:text-primary transition-colors" style={{ color: 'var(--on-surface-variant)' }}>Lighting</span>
                                  <span class="label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>(08)</span>
                              </li>
                              <li class="flex items-center justify-between group cursor-pointer">
                                  <span class="body-md group-hover:text-primary transition-colors" style={{ color: 'var(--on-surface-variant)' }}>Textiles</span>
                                  <span class="label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>(24)</span>
                              </li>
                              <li class="flex items-center justify-between group cursor-pointer">
                                  <span class="body-md group-hover:text-primary transition-colors" style={{ color: 'var(--on-surface-variant)' }}>Ceramics</span>
                                  <span class="label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>(16)</span>
                              </li>
                              <li class="flex items-center justify-between group cursor-pointer">
                                  <span class="body-md group-hover:text-primary transition-colors" style={{ color: 'var(--on-surface-variant)' }}>Art</span>
                                  <span class="label-sm" style={{ color: 'var(--on-surface-variant)', opacity: 0.6 }}>(05)</span>
                              </li>
                          </ul>
                          </div>

                          {/* price range */}
                            <div>
                                <h3 className="font-label-md label-md uppercase tracking-widest mb-6 text-primary">
                                    Price Range
                                </h3>

                                <Slider
                                    value={priceRange}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={10000000}
                                    step={1000000}
                                    marks={[
                                        { value: 0, label: "0" },
                                        { value: 5000000, label: "5jt" },
                                        { value: 10000000, label: "10jt+" },
                                    ]}
                                    valueLabelFormat={(value) =>`${value / 1000000}jt`}
                                    style={{ color: "var(--primary)" }}
                                />

                                {/* custom inputs */}
                                <div className="flex items-center gap-4 mt-6">
                                    {/* min */}
                                    <div className="flex flex-col flex-1 w-16">
                                        <label
                                            className="text-sm mb-2"
                                            style={{color: "var(--on-surface-variant)"}}>
                                            Minimum
                                        </label>

                                        <input
                                            type="text"
                                            value={priceRange[0]}
                                            onChange={handleMinInputChange}
                                            className="border rounded-lg px-4 py-2 bg-transparent"
                                            style={{color: "var(--primary-fixed-dim)"}}/>

                                        <span
                                            className="text-sm mt-1"
                                            style={{color: "var(--on-surface-variant)"}} >{formatRupiah(priceRange[0])}
                                        </span>
                                    </div>

                                    {/* max */}
                                    <div className="flex flex-col flex-1 w-16">
                                        <label
                                            className="text-sm mb-2"
                                            style={{color: "var(--on-surface-variant)"}}> Maximum
                                        </label>

                                        <input
                                            type="text"
                                            value={priceRange[1]}
                                            onChange={handleMaxInputChange}
                                            className="border rounded-lg px-4 py-2 bg-transparent"
                                            style={{color: "var(--primary-fixed-dim)"}}/>

                                        <span
                                            className="text-sm mt-1"
                                            style={{color: "var(--on-surface-variant)"}}>
                                            {formatRupiah(priceRange[1])}
                                        </span>
                                    </div>
                                </div>
                            </div>

                          {/* Material */}
                          <div>
                              <h3 class="label-md text-label-md uppercase tracking-widest mb-6 text-primary">Material</h3>
                              <div class="flex flex-wrap gap-2">
                              <span class="px-3 py-1 bg-secondary border border-outline-variant/30 rounded-full label-sm label-sm text-on-surface-variant cursor-pointer hover:bg-primary hover:text-white transition-colors">Oak</span>
                              <span class="px-3 py-1 bg-secondary border border-outline-variant/30 rounded-full label-sm label-sm text-on-surface-variant cursor-pointer hover:bg-primary hover:text-white transition-colors">Linen</span>
                              <span class="px-3 py-1 bg-secondary border border-outline-variant/30 rounded-full label-sm label-sm text-on-surface-variant cursor-pointer hover:bg-primary hover:text-white transition-colors">Clay</span>
                              <span class="px-3 py-1 bg-secondary border border-outline-variant/30 rounded-full label-sm label-sm text-on-surface-variant cursor-pointer hover:bg-primary hover:text-white transition-colors">Wool</span>
                              <span class="px-3 py-1 bg-secondary border border-outline-variant/30 rounded-full label-sm label-sm text-on-surface-variant cursor-pointer hover:bg-primary hover:text-white transition-colors">Brass</span>
                              </div>
                          </div>


                            {/* availability */}
                            <div>
                            <h3 class="font-label-md text-label-md uppercase tracking-widest mb-6 text-primary">Availability</h3>
                            <label class="flex items-center gap-3 cursor-pointer group">
                            <div class="w-5 h-5 border border-outline-variant rounded flex items-center justify-center group-hover:border-primary transition-colors">
                            <div class="w-3 h-3 bg-primary rounded-sm"></div>
                            </div>
                            <span class="font-body-md text-primary">In Stock</span>
                            </label>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="flex-1">
                        {/* top bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                            <div
                                className="body-md"
                                style={{color: "var(--on-surface-variant)",}}>
                                Showing{" "} <span className="font-bold text-primary">{currentProducts.length}</span>{" "}
                                of{" "} <span className="font-bold text-primary">{products.length} </span>{" "}items
                            </div>
                        </div>

                        {/* Loading */}
                        {loading ? (
                            <div className="text-center py-20">
                                Loading products...
                            </div>
                        ) : (
                            <>
                                {/* Product Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                    {currentProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group cursor-pointer"
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            <div className="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6">
                                                <img
                                                    // src={product.image}
                                                    src={img}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <p
                                                    className="label-sm uppercase tracking-widest"
                                                    style={{
                                                        color:
                                                            "var(--on-surface-variant)",
                                                        opacity: 0.6,
                                                    }}
                                                >
                                                    {product.category}
                                                </p>

                                                <div className="flex justify-between items-baseline gap-4">
                                                    <h3 className="font-headline-md text-headline-md text-primary">
                                                        {product.name}
                                                    </h3>

                                                    <p className="font-label-md text-label-md text-primary whitespace-nowrap">
                                                        {formatRupiah(product.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State */}
                                {currentProducts.length === 0 && (
                                    <div className="text-center py-20">
                                        No products found.
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <nav className="flex justify-center items-center gap-4 mt-24">
                                        {/* Previous */}
                                        <button
                                            onClick={() =>
                                                currentPage > 1 &&
                                                handlePageChange(
                                                    currentPage - 1
                                                )
                                            }
                                            disabled={currentPage === 1}
                                            className="material-symbols-outlined text-primary hover:bg-surface-container w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-40"
                                        >
                                            chevron_left
                                        </button>

                                        {/* Page Numbers */}
                                        {[...Array(totalPages)].map(
                                            (_, index) => {
                                                const page = index + 1;

                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() =>
                                                            handlePageChange(
                                                                page
                                                            )
                                                        }
                                                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors
                                                        ${
                                                            currentPage === page
                                                                ? "bg-primary text-background"
                                                                : "text-primary hover:bg-surface-container"
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            }
                                        )}

                                        {/* Next */}
                                        <button
                                            onClick={() =>
                                                currentPage < totalPages &&
                                                handlePageChange(
                                                    currentPage + 1
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className="material-symbols-outlined text-primary hover:bg-surface-container w-10 h-10 flex items-center justify-center rounded-full transition-colors disabled:opacity-40"
                                        >
                                            chevron_right
                                        </button>
                                    </nav>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}