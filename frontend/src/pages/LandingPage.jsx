// import { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import FooterFull from "../components/FooterFull";

export default function LandingPage() {
    return (
        <>
            <NavbarTop />

            <main className="w-full">

                {/* Hero */}
                <section className="relative mx-auto py-96 sm:px-8 lg:px-14 section-screen w-full overflow-hidden">
                    <div className="absolute inset-0 z-10" style={{ backgroundColor: 'var(--primary)', opacity: 0.4 }} />
                    <img
                        alt="Minimalist Living Room"
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCExO8sjZ39NzxpeTtdlVVUSTEoffsJKgib9ihYsNzvcjvL3x7PG9sq-rEeYFat3qCREum5f7s8Uysu1Rb_fWzYxnSaI4dFmDmvJPrmJC7LcFESix5uv7vq-HYh-ffVcKBVIPpiDXHjtWt-ePVEHDc6gPfKVPinf9cELgDd7hWbs8Q5Owz6dAzh22m3buuUwjgMoQDbvrtQxPRJfB8SmFF0ElwO08G0UPeDGnO1RItMbr5C_MIstmrISWkzDxulOGvLv6wAOPChQg4"
                    />
                    <div className="relative z-20 h-full flex flex-col justify-center items-start px-8 md:px-16 max-w-7xl mx-auto">
                        <h1 className="display-lg md:text-[64px] text-background mb-6 max-w-2xl leading-none">The Poetry of Pure Form.</h1>
                        <p className="body-lg text-background/90 mb-10 max-w-lg">Curated home essentials that celebrate the beauty of raw materials and intentional design. Elevate your sanctuary with Hooma.</p>
                        <button className="text-primary label-lg px-10 py-5 rounded-none transition-colors tracking-widest uppercase" style={{ background: 'var(--surface)' }}>
                            Shop the Collection
                        </button>
                    </div>
                </section>

                {/* Categories */}
                <section className="max-w-7xl mx-auto py-20 sm:px-8 lg:px-14 section-screen">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div>
                            <span className="label-sm text-secondary uppercase tracking-[0.2em] mb-4 block">Our Curations</span>
                            <h2 className="headline-lg text-primary">Intentional Spaces.</h2>
                        </div>
                        <a className="label-md text-primary underline underline-offset-8" href="#">Browse All Categories</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 h-[400px] sm:h-[500px] lg:h-[600px]">
                        {/* Furniture */}
                        <div className="md:col-span-7 relative group overflow-hidden h-[800px]">
                            <img
                                alt="Furniture"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6VTslad47VTMVSoVqawVPA0SCSNm4Hla4brwNBh6U6DsuMMMNc5aufh1XzYi-0k3nc5LpFnvAxtuY9nvmVu-g3Z2Si0aJy2bX9KIIGcTMwOAbr8nuuLQViQVuKnwk0vXK1kHyXbwOiUy_yc966oTopwm0k0PRANbhp8znNGzoDrCzXk_yiakDYKa0AB3DQP01JQEDw_ILOPLtADNMiqbMXkQ3WOfsc-6VHvSwz2WQnn65pqLjGs9lijEJ6bDW9jXgcfRZFJro4dk"
                            />
                            <div className="absolute inset-0 flex items-end p-6 lg:p-10">
                                <div className="backdrop-blur-sm p-6 lg:p-8 w-full max-w-xs" style={{ backgroundColor: 'var(--surface-container-low)', opacity: 0.9 }}>
                                    <h3 className="headline-md text-primary mb-2">Furniture</h3>
                                    <p className="body-md mb-4" style={{ color: 'var(--on-surface-variant)' }}>Sculptural pieces for living.</p>
                                    <span className="label-md text-primary flex items-center gap-2">
                                        View Collection <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Lighting & Textiles Stack */}
                        <div className="md:col-span-5 flex flex-col gap-4 lg:gap-6 h-[800px]">
                            <div className="flex-1 relative group overflow-hidden" style={{ backgroundColor: 'var(--surface-container-low)' }}>
                                <img
                                    alt="Lighting"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6c8yx3daNHylUJSARTdD99V8OYw-oRrtJdo6YhQ2TIJiMpEqyYbAJbAuwT4d6yB7aTAfEqnwazL1WjFB9w2raY2IOfi109yXOTkHvPvRva4tzYgrXjboSogmjWOzweglC7cOOJt57OF6tC87mUjQ_fwdnSIrHCFZHP3lqvLUMBd9-48GAy_yJMTUMSmwcp3llR9pvH6rtPvfmxkk6VO9nZimSQvqcEenNBYvX1qhY85ohBA5nJfk8oy9NncVl-pH9Q6U4wcLXmTE"
                                />
                                <div className="absolute inset-0 bg-primary/5 p-6 lg:p-8 flex flex-col justify-end">
                                    <h3 className="headline-md text-background">Lighting</h3>
                                </div>
                            </div>
                            <div className="flex-1 relative group overflow-hidden">
                                <img
                                    alt="Textiles"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHAnuimBG765y2Rpuo2tTcaOyR200Mre7SJpWALJb3Yy-KKNt61uvy_uC9QICWbM2g62CAxBt2irma9TsfFaTRLZ9mCcEW-EG2LqDFXveqfPF0gBEmd4iF2Acdlcnhmc7H4hfA7-26MM4YxR6xvaksXgeyBoiIesAT8gKqAGKkajQ3lpFzX8LEoxULGPB91vkShFE9Ut2nPtJPlMTgSEGSIWirIgIn5MUuuJ0QTte_g9hH-BckNPnKXJukxyX3w5rtH8Cqlnu--GE"
                                />
                                <div className="absolute inset-0 bg-primary/5 p-6 lg:p-8 flex flex-col justify-end">
                                    <h3 className="headline-md text-background">Textiles</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* New Arrivals */}
                <section className="py-20 section-screen" style={{ backgroundColor: 'var(--surface-container-low)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
                        <div className="text-center mb-16">
                            <h2 className="headline-lg text-primary mb-4">New Arrivals</h2>
                            <p className="body-md max-w-md mx-auto" style={{ color: 'var(--on-surface-variant)' }}>Rare objects for the discerning eye. Each piece is hand-selected for its material integrity.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 lg:gap-x-10">
                            {[
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaCujXRQ3IyU0aOpt4xZg7D4vFd8v_QqdOHTswOto87TI5NdWTbe3Lzp94MyP2d8p2P8cBCRzZC4IGEQbf14UATj0eqfMP4asprJkPVVneuRz2pg9DZOfbnCaRRVkUGunzdLaL6-oO-dR38gFE3887vJTOpVCwhya5TZIgIw5riugquFdLFwmlqBSAqWnZ8UStAOHIrvpOxCnm34BUIfLvZcPzf8UiV62XCTo868o5MBVitmJaexhrJZPfKpz_VBQ4_1pzps0f2Bs", alt: "Ceramic Vase", name: "Kyoto Ceramic Vase", cat: "Ceramics", price: "$185.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9-RpFn4B_HSCDIzLZRek2edHaMLFuYWuorgsIydjk8OUoTSJrczPCEBL4c51Dq36jdKIW1gqee9bqKuRzjFZAnJyhD_W-TdDcQ6KmBXavjrkVFBJkI3YWrPEyjmL3JZRc2ZlB5x_apqHPQCDrU5VG8XazaJcbvs_OHeMaWTmCLNm9VuA23dWm3IMvQ1ZpXbRhW0oKc3PfHiqJmgy00Ai8PmHb4-UXdRL2p7nEboONKw7IwdqI1oYG_0SCpdLBu3SNgM8qEDGQc1k", alt: "Side Table", name: "Travertine Side Table", cat: "Furniture", price: "$890.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZhXk__WHIZcm2PdHLjx1jy9dLbn81hU8YURnAjmYOBSTn021elXAsyXwBN98H9EuoKF_Pci3mi7GpYBxA8X33xVR4dcGxK-Nxs99imk_5SlQ6HXQ-Y3rWmJeQenyOUuDk-WTwQ4uc903_x5phnopHmZxofVWIvPqAoabwpQJsxXrlYZviL3NC2DBEJLLwh2nqe1lpkbRYLjYLnKbKt0bPgunrWMryQi1kQLgObG730JewSWh5zdEgBnmtKQxkA-l2SiqstBAJCwg", alt: "Wall Art", name: "Ink Study No. 4", cat: "Art", price: "$185.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsa1gZ2fGVbS5Ljd50X2iBgKDAHu0PZkFmnxmtL4dUa4IIVqIvv9skOhP0ex4bjZb3J7AphuVyQAHhDXL5YXsGH0ccy7YyZf7elZqQTk1H9RYDoXattzFBhKtxS5W2deQUmAZKHNWQLS6bUhgRnVTa6ghJIg7lPNnEzgczTxMLRXT6fM10qnzjw9k0JGmNeejyLUQqpckD4efpAM3rhOzXG7BW0Gb7E_2MBOHGIQwhewfPi5cCfoTqnxRLIkviIBgtRE88fhrdWk4", alt: "Linen Pillow", name: "Hand-loomed Linen Pillow", cat: "Textiles", price: "$95.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsa1gZ2fGVbS5Ljd50X2iBgKDAHu0PZkFmnxmtL4dUa4IIVqIvv9skOhP0ex4bjZb3J7AphuVyQAHhDXL5YXsGH0ccy7YyZf7elZqQTk1H9RYDoXattzFBhKtxS5W2deQUmAZKHNWQLS6bUhgRnVTa6ghJIg7lPNnEzgczTxMLRXT6fM10qnzjw9k0JGmNeejyLUQqpckD4efpAM3rhOzXG7BW0Gb7E_2MBOHGIQwhewfPi5cCfoTqnxRLIkviIBgtRE88fhrdWk4", alt: "Linen Pillow", name: "Hand-loomed Linen Pillow", cat: "Textiles", price: "$95.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9-RpFn4B_HSCDIzLZRek2edHaMLFuYWuorgsIydjk8OUoTSJrczPCEBL4c51Dq36jdKIW1gqee9bqKuRzjFZAnJyhD_W-TdDcQ6KmBXavjrkVFBJkI3YWrPEyjmL3JZRc2ZlB5x_apqHPQCDrU5VG8XazaJcbvs_OHeMaWTmCLNm9VuA23dWm3IMvQ1ZpXbRhW0oKc3PfHiqJmgy00Ai8PmHb4-UXdRL2p7nEboONKw7IwdqI1oYG_0SCpdLBu3SNgM8qEDGQc1k", alt: "Side Table", name: "Travertine Side Table", cat: "Furniture", price: "$890.00" },
                                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsa1gZ2fGVbS5Ljd50X2iBgKDAHu0PZkFmnxmtL4dUa4IIVqIvv9skOhP0ex4bjZb3J7AphuVyQAHhDXL5YXsGH0ccy7YyZf7elZqQTk1H9RYDoXattzFBhKtxS5W2deQUmAZKHNWQLS6bUhgRnVTa6ghJIg7lPNnEzgczTxMLRXT6fM10qnzjw9k0JGmNeejyLUQqpckD4efpAM3rhOzXG7BW0Gb7E_2MBOHGIQwhewfPi5cCfoTqnxRLIkviIBgtRE88fhrdWk4", alt: "Linen Pillow", name: "Hand-loomed Linen Pillow", cat: "Textiles", price: "$95.00" },
                            ].map((item) => (
                                <div key={item.name} className="flex flex-col group h-96">
                                    <div className="relative aspect-[3/4] overflow-hidden mb-6" style={{ backgroundColor: 'var(--surface)' }}>
                                        <img alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
                                        <button className="absolute bottom-4 right-4 bg-primary text-background p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-[20px]">add</span>
                                        </button>
                                    </div>
                                    <h4 className="label-md text-primary mb-1">{item.name}</h4>
                                    <p className="label-sm mb-2" style={{ color: 'var(--on-surface-variant)' }}>{item.cat}</p>
                                    <span className="body-md text-secondary">{item.price}</span>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>


                {/* news letter section */}
                <section className="py-32 px-16 h-[600px]">
                        <div className="max-w-2xl mx-auto text-center">
                                <span className="label-sm text-secondary uppercase tracking-widest mb-6 block">Join the Circle</span>
                                <h2 className="display-lg headline-lg text-primary mb-6">Receive our seasonal lookbook.</h2>
                                <p className="body-md mb-10" style={{ color: 'var(--on-surface-variant)' }}>
                                    Exclusive access to new collections and interior inspiration, delivered sparingly.
                                </p>
                                <form className="flex flex-col sm:flex-row gap-4">
                                        <input className="flex-grow border-none border-b border-primary focus:ring-0 px-6 py-4 body-md text-primary placeholder:text-on-surface-variant" 
                                            placeholder="Email Address" type="email" style={{ backgroundColor: 'var(--surface-container-low)' }}/>
                                        <button className="text-on-tertiary label-md px-10 py-4 uppercase tracking-widest hover:opacity-90 transition-opacity"
                                            style={{ backgroundColor: 'var(--primary-container)', color: 'var(--on-primary-container)' }} 
                                            type="submit">
                                            Subscribe
                                        </button>
                                </form>
                        </div>
                </section>

            </main>

            <FooterFull />
            <Footer />
        </>
    );
}