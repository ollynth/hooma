import { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Footer from "../components/Footer";

// Eye icons
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#795950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = () => {
      const err = {};
      if (!email) {
        err.email = "Email is required";
      } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err.email = "Please enter a valid email address";
      }

      if (!password) {
        err.password = "Password is required.";
      } else if (password.length < 6) {
        err.password = "Password must be at least 6 characters.";
      }
      return err;
    }

    const handleSubmit = async () => {
      const err = validate();
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      setError({});
      setLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setSuccess(true);
    }

    return (
      <>
      {console.log("login page rendered")}

      <div className="min-h-screen flex flex-col" style={{ color: 'var(--on-surface)', background: 'var(--background)' }}>

        {/* Header */}
        <NavbarTop />

        {/* Main Content */}
        <main className="position-relative z-10 flex flex-1 items-center justify-center px-16 py-4">
          <div className="card w-full ">
            <>
              {/* Form card header */}
              <div className="text-center mb-10">
                <h2 className="headline-lg mb-4">Welcome Back</h2>
                <p className="body-md">Enter credentials to access your sanctuary.</p>
              </div>

              {/* Form fields */}
              <div className="flex flex-col gap-0">
                {/* email */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="email">Email Address</label>
                  <input
                      id="email"
                      type="email"
                      className={`form-input${error.email ? " error" : ""} body-md`}
                      placeholder="hello@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error.email) setError((prev) => ({ ...prev, email: undefined }));
                      }}
                      autoComplete="email"
                    />
                    {error.email && <span className="form-error">{error.email}</span>}
                </div>

                {/* password */}
                <div className="flex flex-col gap-2 mb-6">
                  <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="password">Password</label>
                  <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-input${error.password ? " error" : ""} body-md`}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error.password) setError((prev) => ({ ...prev, password: undefined }));
                        }}
                        autoComplete="current-password"
                        style={{ paddingRight: '32px' }}
                      />

                      {/* toggle password visibility */}
                      <button
                        type="button"
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center p-1 transition-opacity hover:opacity-80"
                        style={{ color: 'var(--outline)' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((v) => !v)}>
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                  </div>
                    {error.password && <span className="form-error">{error.password}</span>}
                </div>

                {/* sign in button */}
                <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`btn-primary${loading ? " loading" : ""} label-md`}
                >
                  {loading && <span className="spinner" />}
                  Sign In
                </button>

                {/* divider */}
                <div className="divider">
                  <span className="body-md uppercase" style={{color: 'var(--on-surface-variant)'}}> or</span>
                </div>

                {/* social login buttons */}
                 <button type="button" className="btn-google label-md uppercase"
                  style={{color: 'var(--on-surface-variant)'}}
                  onClick={() => alert("Google sign-in coming soon.")}>
                    <GoogleIcon />
                    Sign in with Google
                  </button>
              </div>

              {/* sign up */}
              <div className="items-center text-center m-6 p-2">
                <span className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                  Don't have an account? 
                  <a href="/signup" className="text-primary label-md-sr hover:underline mx-2 transition-colors duration-300">
                    Sign up
                  </a>
                </span>
              </div>
            </>
          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>

      </>
    )
}