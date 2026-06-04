import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBarTop() {
  const userIsLoggedIn = !!localStorage.getItem('authToken');
  console.log("NavBarTop rendered, userIsLoggedIn:", userIsLoggedIn);
  console.log("Auth token:", localStorage.getItem('authToken'));

  const profileLink = userIsLoggedIn ? '/profile' : '/sign-in';
  const profileIcon = userIsLoggedIn ? 'person' : 'login';

   const navigate = useNavigate();

  const handleLogout = () => {
            localStorage.removeItem('authToken');
            navigate('/sign-in'); // Redirect to login page
    };

  const navLinkClass = ({ isActive }) =>
    `label-md transition-colors duration-300 ${
      isActive
        ? 'text-primary border-b border-primary pb-0.5'
        : 'text-on-surface-variant hover:text-primary'
    }`;

  return (
    <header
      className="navbar w-full sticky top-0 z-50 backdrop-blur-sm transition-opacity duration-300"
      style={{
        backgroundColor: 'var(--surface-container-low)',
        opacity: 0.85,
      }}
    >
      <div className="flex justify-between items-center w-full px-[64px] py-6 max-w-[1280px] mx-auto">

        <div className="flex items-center gap-8">
          <NavLink className="logo" to="/">
            Hooma
          </NavLink>

          <nav className="nav-links">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/catalog" className={navLinkClass}>Catalog</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <nav className="nav-links">
            <div
              className="flex items-center py-2 px-4 rounded-full border"
              style={{
                background: 'var(--surface-container-low)',
                borderColor: 'var(--outline-variant)',
              }}
            >
              <input
                className="bg-transparent border-none focus:ring-0 label-sm outline-none"
                style={{ color: 'var(--on-surface-variant)' }}
                placeholder="Search item..."
              />
              <button
                className="material-symbols-outlined hover:opacity-80 transition-opacity text-on-surface-variant text-[20px]"
              >
                search
              </button>
            </div>

            <div className="nav-icons">
              <NavLink to="/cart">
                <button className="material-symbols-outlined hover:opacity-80 transition-opacity">
                  shopping_cart
                </button>
              </NavLink>

             <NavLink to={profileLink}>
              <button className="material-symbols-outlined hover:opacity-80 transition-opacity">
                {profileIcon}
              </button>
              </NavLink>
            </div>

            <button className="flex items-center gap-3 px-4 py-3 label-md w-full rounded-lg transition-colors duration-200 hover:opacity-70"  onClick={handleLogout} style={{ color: "var(--error)" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>logout</span>
                                    Sign Out
                                </button>
          </nav>
        </div>

      </div>
    </header>
  );
}