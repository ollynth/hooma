
export default function NavBarTop() {
  return (
    <header className="navbar w-full sticky top-0 z-50 backdrop-blur-sm transition-opacity duration-300"  style={{ backgroundColor: 'var(--surface-container-low)',  opacity: 0.85 }}>
      <div className="flex justify-between items-center w-full px-[64px] py-6 max-w-[1280px] mx-auto ">
        {/* left side navigation */}
        <div className="flex items-center gap-8">
          <a className="logo" href="/">Hooma</a>
          <nav className="nav-links">
            <a className="label-md text-on-surface-variant border-b border-primary hover:text-primary transition-colors duration-300" href="/">Home</a>
            <a className="label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="/catalog">Catalog</a>
            <a className="label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="/about">About</a>
          </nav>
        </div> 

        {/* right side navigation */}
        <div className="flex items-center gap-8">
          <nav class="nav-links">
            {/* search bar */}
            <div className="flex items-center py-2 px-4 rounded-full border" style={{ background: 'var(--surface-container-low)' , borderColor: 'var(--outline-variant)' }}>
              <input className="bg-transparent border-none focus:ring-0 label-sm outline-none" style={{ color: 'var(--on-surface-variant)' }} placeholder="Search item..." />
              <button className="material-symbols-outlined hover:opacity-80 transition-opacity text-on-surface-variant text-[20px]" data-icon="search">search</button>
            </div>
            <div class="nav-icons">
            <button class="material-symbols-outlined hover:opacity-80 transition-opacity" data-icon="shopping_cart">shopping_cart</button>
            <button class="material-symbols-outlined hover:opacity-80 transition-opacity" data-icon="person">person</button>
            </div>
          </nav>
        </div>

      </div>
      
    </header>
  );
}