// import { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";

export default function LandingPage() {

    return (
        <>
            {console.log("LandingPage Rendered")}
            <NavbarTop />


            {/* Landing Page Content */}
            <main className="w-full">
                 <section class="relative h-[880px] w-full overflow-hidden">
                        <div class="absolute inset-0 z-10" style={{ backgroundColor: 'var(--primary)', opacity: 0.4 }}></div>
                        <img alt="Minimalist Living Room" class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCExO8sjZ39NzxpeTtdlVVUSTEoffsJKgib9ihYsNzvcjvL3x7PG9sq-rEeYFat3qCREum5f7s8Uysu1Rb_fWzYxnSaI4dFmDmvJPrmJC7LcFESix5uv7vq-HYh-ffVcKBVIPpiDXHjtWt-ePVEHDc6gPfKVPinf9cELgDd7hWbs8Q5Owz6dAzh22m3buuUwjgMoQDbvrtQxPRJfB8SmFF0ElwO08G0UPeDGnO1RItMbr5C_MIstmrISWkzDxulOGvLv6wAOPChQg4"/>
                
                        <div class="relative z-20 h-full flex flex-col justify-center items-start px-16 max-w-7xl mx-auto">
                                <h1 class="display-lg md:text-[64px] text-background mb-6 max-w-2xl leading-none">The Poetry of Pure Form.</h1>
                                <p class="body-lg text-background/90 mb-10 max-w-lg">Curated home essentials that celebrate the beauty of raw materials and intentional design. Elevate your sanctuary with Hooma.</p>
                                <button class="text-primary label-lg px-10 py-5 rounded-none transition-colors tracking-widest uppercase" style={{ background: 'var(--surface)', hover: 'var(--surface-container)' }}>
                                    Shop the Collection
                                </button>
                        </div>
                </section>

                <section class="relative h-[962px] max-w-7xl mx-auto py-10 px-14">
                         <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                                <div>
                                    <span class="label-sm text-secondary uppercase tracking-[0.2em] mb-4 block">Our Curations</span>
                                    <h2 class="headline-lg text-headline-lg text-primary">Intentional Spaces.</h2>
                                </div>
                                <a class="label-md text-primary underline underline-offset-8" href="#">Browse All Categories</a>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 h-[600px]">
                        {/*  Furniture */}
                            <div class="md:col-span-7 relative group overflow-hidden">
                                    <img alt="Furniture" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6VTslad47VTMVSoVqawVPA0SCSNm4Hla4brwNBh6U6DsuMMMNc5aufh1XzYi-0k3nc5LpFnvAxtuY9nvmVu-g3Z2Si0aJy2bX9KIIGcTMwOAbr8nuuLQViQVuKnwk0vXK1kHyXbwOiUy_yc966oTopwm0k0PRANbhp8znNGzoDrCzXk_yiakDYKa0AB3DQP01JQEDw_ILOPLtADNMiqbMXkQ3WOfsc-6VHvSwz2WQnn65pqLjGs9lijEJ6bDW9jXgcfRZFJro4dk"/>
                                    <div class="absolute inset-0 flex items-end p-10">
                                        <div class=" backdrop-blur-sm p-8 w-full max-w-xs" style={{ backgroundColor: 'var(--surface-container-low)',  opacity: 0.8 }}>
                                                <h3 class="headline-md text-primary mb-2">Furniture</h3>
                                                <p class="body-md mb-4" style={{ color: 'var(--on-surface-variant)' }}>Sculptural pieces for living.</p>
                                                    <span class="label-md text-primary flex items-center gap-2">View Collection <span class="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span></span>
                                        </div>
                                    </div>
                            </div>
                            {/* Lighting & Textiles Stack */}
                            <div class="md:col-span-5 flex flex-col gap-6">
                                <div class="flex-1 relative group overflow-hidden" style={{ backgroundColor: 'var(--surface-container-low)' }}>
                                    <img alt="Lighting" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A minimalist brushed brass table lamp with a soft white linen shade, casting a warm ambient glow on a stone surface. The background is a dark, moody warm grey with subtle textures. The lighting is focused and atmospheric, emphasizing the sleek, thin-stroke silhouette of the lamp. Luxury boutique aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6c8yx3daNHylUJSARTdD99V8OYw-oRrtJdo6YhQ2TIJiMpEqyYbAJbAuwT4d6yB7aTAfEqnwazL1WjFB9w2raY2IOfi109yXOTkHvPvRva4tzYgrXjboSogmjWOzweglC7cOOJt57OF6tC87mUjQ_fwdnSIrHCFZHP3lqvLUMBd9-48GAy_yJMTUMSmwcp3llR9pvH6rtPvfmxkk6VO9nZimSQvqcEenNBYvX1qhY85ohBA5nJfk8oy9NncVl-pH9Q6U4wcLXmTE"/>
                                    <div class="absolute inset-0 bg-primary/5 p-8 flex flex-col justify-end">
                                        <h3 class="font-headline-md text-background">Lighting</h3>
                                    </div>
                                </div>

                                <div class="flex-1 relative group overflow-hidden">
                                    <img alt="Textiles" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="High-quality close up of folded linen and wool textiles in neutral shades of bone, sand, and charcoal. The texture of the natural fibers is highly visible and tactile. The lighting is a soft side-light that creates gentle shadows in the folds. The mood is calm, organic, and premium, following a minimalist home decor visual system." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHAnuimBG765y2Rpuo2tTcaOyR200Mre7SJpWALJb3Yy-KKNt61uvy_uC9QICWbM2g62CAxBt2irma9TsfFaTRLZ9mCcEW-EG2LqDFXveqfPF0gBEmd4iF2Acdlcnhmc7H4hfA7-26MM4YxR6xvaksXgeyBoiIesAT8gKqAGKkajQ3lpFzX8LEoxULGPB91vkShFE9Ut2nPtJPlMTgSEGSIWirIgIn5MUuuJ0QTte_g9hH-BckNPnKXJukxyX3w5rtH8Cqlnu--GE"/>
                                    <div class="absolute inset-0 bg-primary/5 p-8 flex flex-col justify-end">
                                        <h3 class="font-headline-md text-background">Textiles</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>


                {/* New Arrivals */}
                <section class="py-24" style={{ backgroundColor: 'var(--surface-container-low)' }}>
                    <div class="max-w-7xl mx-auto px-16">
                        <div class="text-center mb-16">
                            <h2 class="display-lg headline-lg text-primary mb-4">New Arrivals</h2>
                            <p class="body-md max-w-md mx-auto" style={{ color: 'var(--on-surface-variant)' }}>Rare objects for the discerning eye. Each piece is hand-selected for its material integrity.</p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        <div class="flex flex-col group">
                            <div class="relative aspect-[3/4] bg-surface overflow-hidden mb-6">
                                <img alt="Ceramic Vase" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A tall, matte white ceramic vase with an organic, asymmetrical shape standing on a minimalist wooden pedestal. The lighting is clean and architectural, creating a single soft shadow against a warm beige background. The overall look is extremely high-end, editorial, and curated, with a thin-stroke aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaCujXRQ3IyU0aOpt4xZg7D4vFd8v_QqdOHTswOto87TI5NdWTbe3Lzp94MyP2d8p2P8cBCRzZC4IGEQbf14UATj0eqfMP4asprJkPVVneuRz2pg9DZOfbnCaRRVkUGunzdLaL6-oO-dR38gFE3887vJTOpVCwhya5TZIgIw5riugquFdLFwmlqBSAqWnZ8UStAOHIrvpOxCnm34BUIfLvZcPzf8UiV62XCTo868o5MBVitmJaexhrJZPfKpz_VBQ4_1pzps0f2Bs"/>
                                <button class="absolute bottom-4 right-4 bg-primary text-background p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                                </button>
                            </div>
                            <h4 class="label-md text-primary mb-1">Kyoto Ceramic Vase</h4>
                            <p class="label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Ceramics</p>
                            <span class="font-body-md text-secondary">$185.00</span>
                        </div>
                        <div class="flex flex-col group">
                            <div class="relative aspect-[3/4] bg-surface overflow-hidden mb-6">
                                <img alt="Side Table" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9-RpFn4B_HSCDIzLZRek2edHaMLFuYWuorgsIydjk8OUoTSJrczPCEBL4c51Dq36jdKIW1gqee9bqKuRzjFZAnJyhD_W-TdDcQ6KmBXavjrkVFBJkI3YWrPEyjmL3JZRc2ZlB5x_apqHPQCDrU5VG8XazaJcbvs_OHeMaWTmCLNm9VuA23dWm3IMvQ1ZpXbRhW0oKc3PfHiqJmgy00Ai8PmHb4-UXdRL2p7nEboONKw7IwdqI1oYG_0SCpdLBu3SNgM8qEDGQc1k"/>
                                <button class="absolute bottom-4 right-4 bg-primary text-background p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                                </button>
                            </div>
                            <h4 class="font-label-md text-primary mb-1">Travertine Side Table</h4>
                            <p class="font-label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Furniture</p>
                            <span class="font-body-md text-secondary">$890.00</span>
                        </div>

                        <div class="flex flex-col group">
                            <div class="relative aspect-[3/4] bg-surface overflow-hidden mb-6">
                                <img alt="Wall Art" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhXk__WHIZcm2PdHLjx1jy9dLbn81hU8YURnAjmYOBSTn021elXAsyXwBN98H9EuoKF_Pci3mi7GpYBxA8X33xVR4dcGxK-Nxs99imk_5SlQ6HXQ-Y3rWmJeQenyOUuDk-WTwQ4uc903_x5phnopHmZxofVWIvPqAoabwpQJsxXrlYZviL3NC2DBEJLLwh2nqe1lpkbRYLjYLnKbKt0bPgunrWMryQi1kQLgObG730JewSWh5zdEgBnmtKQxkA-l2SiqstBAJCwg"/>
                                <button class="absolute bottom-4 right-4 bg-primary text-background p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                                </button>
                            </div>
                             <h4 class="font-label-md text-primary mb-1">Ink Study No. 4</h4>
                            <p class="label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Art</p>
                            <span class="font-body-md text-secondary">$185.00</span>
                        </div>

                        <div class="flex flex-col group">
                            <div class="relative aspect-[3/4] bg-surface overflow-hidden mb-6">
                                <img alt="Linen Pillow" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsa1gZ2fGVbS5Ljd50X2iBgKDAHu0PZkFmnxmtL4dUa4IIVqIvv9skOhP0ex4bjZb3J7AphuVyQAHhDXL5YXsGH0ccy7YyZf7elZqQTk1H9RYDoXattzFBhKtxS5W2deQUmAZKHNWQLS6bUhgRnVTa6ghJIg7lPNnEzgczTxMLRXT6fM10qnzjw9k0JGmNeejyLUQqpckD4efpAM3rhOzXG7BW0Gb7E_2MBOHGIQwhewfPi5cCfoTqnxRLIkviIBgtRE88fhrdWk4"/>
                                    <button class="absolute bottom-4 right-4 bg-primary text-background p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                                </button>
                            </div>
                            <h4 class="label-md text-primary mb-1">Hand-loomed Linen Pillow</h4>
                            <p class="label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>Textiles</p>
                            <span class="font-body-md text-secondary">$95.00</span>
                        </div>
            
                        </div>
                    </div>
                </section>
            </main>

            <FooterFull />
            <Footer />
        </>
    )
}