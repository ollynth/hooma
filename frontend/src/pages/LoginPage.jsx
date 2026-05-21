import { useState } from "react";
import NavbarTop from "../components/NavBarTop";
import Footer from "../components/Footer";
import EyeIcon from "../components/icons/EyeIcon";
import EyeIconOff from "../components/icons/EyeIconOff";
import GoogleIcon from "../components/icons/GoogleIcon";

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
                        {showPassword ? <EyeIconOff /> : <EyeIcon />}
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
                  <a href="/sign-up" className="text-primary label-md-sr hover:underline mx-2 transition-colors duration-300">
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