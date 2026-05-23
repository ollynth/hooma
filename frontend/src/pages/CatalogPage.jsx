// import { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";
import { Slider } from '@mui/material';

export default function CatalogPage() {
    return (
        <>
        <NavbarTop />

        <main className="max-w-7xl mx-auto py-20 sm:px-8 lg:px-14">
            {/* Page Header */}
            <section class="mb-20 text-center flex flex-col">
                <h1 class="display-lg mb-4 text-primary">Our Collection</h1>
                <p class="body-lg body-lg leading-relaxed text-center" style={{ color: 'var(--on-surface-variant)' }}>
                    Curated essentials for the intentional home. Our collection blends timeless craftsmanship with modern textures, designed to bring a sense of calm and tactile beauty to your daily rituals.
                </p>
            </section>

            <div class="flex flex-col md:flex-row gap-12">
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
                            <h3 class="font-label-md label-md uppercase tracking-widest mb-6 text-primary">Price Range</h3>
                            <div class="relative w-full h-1 bg-surface-container-high rounded-full mb-4">
                                <Slider
                                aria-label="Price"
                                defaultValue={30}
                                getAriaValueText={(value) => `$${value}`}
                                valueLabelDisplay="auto"
                                shiftStep={30}
                                step={10}
                                marks
                                min={10}
                                max={110}
                                style={{ color: 'var(--primary)' }}
                                /> 
                            </div>
                            <div class="flex justify-between font-label-sm text-label-sm" style={{ color: 'var(--on-surface-variant)' }}>
                            <span>$0</span>
                            <span>$1,500</span>
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

                {/* main content */}
                <section class="flex-1">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                        <div class="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                            Showing <span class="font-bold text-primary">12</span> of <span class="font-bold text-primary">64</span> items
                        </div>
                    <div class="flex items-center gap-4 w-full sm:w-auto">
                        <span class="label-md text-label-md text-on-surface-variant whitespace-nowrap">Sort by:</span>
                        <select class="bg-transparent border-none border-b border-outline-variant focus:ring-0 focus:border-primary label-md label-md text-primary py-1 pr-8 cursor-pointer w-full sm:w-auto">
                            <option>Featured</option>
                            <option>Newest Arrivals</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                    </div>

                    {/* product grid */}
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">   
                        <div class="group cursor-pointer">
                        <div class="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6">
                        <img alt="Kyoto Ceramic Vase" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="A studio photograph of a tall, elegant handcrafted ceramic vase with a textured matte beige finish, standing against a neutral warm background. The lighting is soft and directional, highlighting the subtle organic imperfections of the clay. The mood is serene and minimalist, reflecting Japanese wabi-sabi aesthetics. High-end luxury decor styling with natural shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzdMGzLqfMG1ck2oMZYnVIQPCx_CqTKb0wlvCAFj4z9z_7a5pWpPJ5Xac21cr8BviJEW1RrxNDMZZ-IKIzWm2hhYBPtYl7txjRgSz1yJRgBLJ0uqeQiCkUwfEHuP3hROJ-aATuRLBYNCwVdWcWNAo48_MJJfk5PX2lpq5yKW-v7l8tx_ZuNIkrt0WkPia9jWJb2dTrvIN9WkRrS97Erl79K7P_6fCrip91xb6RLuhGUyPYOUmu1ckcAOScq5eFQN0H173ljqJN4qM"/>
                        </div>
                        <div class="space-y-1">
                        <p class="label-sm label-sm uppercase tracking-widest" style={{color: 'var(--on-surface-variant)', opacity: 0.6}}>Ceramics</p>
                        <div class="flex justify-between items-baseline">
                        <h3 class="font-headline-md text-headline-md text-primary">Kyoto Ceramic Vase</h3>
                        <p class="font-label-md text-label-md text-primary">$185.00</p>
                        </div>
                        </div>
                        </div>

                        <div class="group cursor-pointer">
                            <div class="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6">
                            <img alt="Linen Weave Throw" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="A close-up shot of a high-quality, thick-weave linen throw blanket in a soft oatmeal color, draped gracefully over a light oak chair. The texture of the fabric is highly detailed, showing individual natural fibers. Warm afternoon sunlight streams across the textile, creating gentle highlights and deep, soft shadows. The overall vibe is cozy, organic, and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVsO70jpIIfPdyblWyzoaHxjHzh6e0e2wFsfdxUUc7CNatqLIjkskow50YQgEUXmejHda6VHbcRjZw_AZ-jtmBGPgZCxo0rL1P5bN_D0YIufcpS14xOPhhVZvF82amiUBQkUdNm0rqmoxYwk0qafjHeTkMVQStqwvsyzNi1eAzyEgikR1U0c2cqKd3teW06hTzoUydyWs37D3RP22Y9E_EeDFstBGD_mV3Frm6YgOsr9jq8z4IsclA1xzBIy67fOgaKz5rdZGZXa4"/>
                            </div>
                            <div class="space-y-1">
                            <p class="label-sm label-sm uppercase tracking-widest" style={{color: 'var(--on-surface-variant)', opacity: 0.6}}>Textiles</p>
                            <div class="flex justify-between items-baseline">
                            <h3 class="font-headline-md text-headline-md text-primary">Linen Weave Throw</h3>
                            <p class="font-label-md text-label-md text-primary">$120.00</p>
                            </div>
                            </div>
                        </div>
                        
                        <div class="group cursor-pointer">
                            <div class="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6">
                            <img alt="Linen Weave Throw" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="A close-up shot of a high-quality, thick-weave linen throw blanket in a soft oatmeal color, draped gracefully over a light oak chair. The texture of the fabric is highly detailed, showing individual natural fibers. Warm afternoon sunlight streams across the textile, creating gentle highlights and deep, soft shadows. The overall vibe is cozy, organic, and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVsO70jpIIfPdyblWyzoaHxjHzh6e0e2wFsfdxUUc7CNatqLIjkskow50YQgEUXmejHda6VHbcRjZw_AZ-jtmBGPgZCxo0rL1P5bN_D0YIufcpS14xOPhhVZvF82amiUBQkUdNm0rqmoxYwk0qafjHeTkMVQStqwvsyzNi1eAzyEgikR1U0c2cqKd3teW06hTzoUydyWs37D3RP22Y9E_EeDFstBGD_mV3Frm6YgOsr9jq8z4IsclA1xzBIy67fOgaKz5rdZGZXa4"/>
                            </div>
                            <div class="space-y-1">
                            <p class="label-sm label-sm uppercase tracking-widest" style={{color: 'var(--on-surface-variant)', opacity: 0.6}}>Textiles</p>
                            <div class="flex justify-between items-baseline">
                            <h3 class="font-headline-md text-headline-md text-primary">Linen Weave Throw</h3>
                            <p class="font-label-md text-label-md text-primary">$120.00</p>
                            </div>
                            </div>
                        </div>

                        <div class="group cursor-pointer">
                            <div class="aspect-[4/5] overflow-hidden bg-surface-container-low mb-6">
                            <img alt="Linen Weave Throw" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="A close-up shot of a high-quality, thick-weave linen throw blanket in a soft oatmeal color, draped gracefully over a light oak chair. The texture of the fabric is highly detailed, showing individual natural fibers. Warm afternoon sunlight streams across the textile, creating gentle highlights and deep, soft shadows. The overall vibe is cozy, organic, and premium." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVsO70jpIIfPdyblWyzoaHxjHzh6e0e2wFsfdxUUc7CNatqLIjkskow50YQgEUXmejHda6VHbcRjZw_AZ-jtmBGPgZCxo0rL1P5bN_D0YIufcpS14xOPhhVZvF82amiUBQkUdNm0rqmoxYwk0qafjHeTkMVQStqwvsyzNi1eAzyEgikR1U0c2cqKd3teW06hTzoUydyWs37D3RP22Y9E_EeDFstBGD_mV3Frm6YgOsr9jq8z4IsclA1xzBIy67fOgaKz5rdZGZXa4"/>
                            </div>
                            <div class="space-y-1">
                            <p class="label-sm label-sm uppercase tracking-widest" style={{color: 'var(--on-surface-variant)', opacity: 0.6}}>Textiles</p>
                            <div class="flex justify-between items-baseline">
                            <h3 class="font-headline-md text-headline-md text-primary">Linen Weave Throw</h3>
                            <p class="font-label-md text-label-md text-primary">$120.00</p>
                            </div>
                            </div>
                        </div>
                    </div>

                   {/* pagination */}
                    <nav class="flex justify-center items-center gap-4 mt-24">
                    <button class="material-symbols-outlined text-primary hover:bg-surface-container w-10 h-10 flex items-center justify-center rounded-full transition-colors">chevron_left</button>
                    {/* active page */}
                    <a class="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-background label-md label-md" href="#">1</a>
                    {/* inactive pages */}
                    <a class="w-10 h-10 flex items-center justify-center rounded-full text-primary label-md label-md hover:bg-surface-container transition-colors" href="#">2</a>
                    <a class="w-10 h-10 flex items-center justify-center rounded-full text-primary label-md label-md hover:bg-surface-container transition-colors" href="#">3</a>
                    <span class="text-primary">...</span>
                    <a class="w-10 h-10 flex items-center justify-center rounded-full text-primary label-md label-md hover:bg-surface-container transition-colors" href="#">8</a>
                    <button class="material-symbols-outlined text-primary hover:bg-surface-container w-10 h-10 flex items-center justify-center rounded-full transition-colors">chevron_right</button>
                    </nav>
                </section>
            </div>
        </main>

        <FooterFull />
        <Footer />
        </>
    )

}