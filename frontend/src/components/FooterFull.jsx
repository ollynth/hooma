export default function FooterFull() {
    return (
        <footer class="footer">
            <div className="max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-8 px-[64px] py-16 w-full mx-auto">
                {/* logo */}
                <div>
                    <span className="footer-logo text-primary mb-6 block tracking-tight">Hooma</span>
                    <p className="footer-description max-w-xs mb-8">Crafting intentional living spaces through the lens of warm minimalism.</p>

                    <div className="flex gap-4">
                        <span class="material-symbols-outlined" data-icon="public">public</span>
                        <span class="material-symbols-outlined" data-icon="share">share</span>
                    </div>
                </div>

                {/* shop */}
                <div>
                    <h5 className="label-md mb-6 uppercase tracking-widest">Shop</h5>
                    <ul>
                        <li><a className="body-md hover:text-primary transition-colors" href="">All collections</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Furniture</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Lightning</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Textiles</a></li>
                    </ul>
                </div>


                {/* support */}
                <div>
                    <h5 className="label-md mb-6 uppercase tracking-widest">Support</h5>
                    <ul>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Shipping</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Returns</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Contact</a></li>
                    </ul>
                </div>

                {/* explore */}
                <div>
                    <h5 className="label-md mb-6 uppercase tracking-widest">Explore</h5>
                    <ul>
                        <li><a className="body-md hover:text-primary transition-colors" href="">About Hooma</a></li>
                        <li><a className="body-md hover:text-primary transition-colors" href="">Store Locator</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}