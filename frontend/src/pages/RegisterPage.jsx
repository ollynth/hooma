import { useState } from "react";
import EyeIcon from "../components/icons/EyeIcon";
import EyeIconOff from "../components/icons/EyeIconOff";
import GoogleIcon from "../components/icons/GoogleIcon";
import { registerUser, loginUser } from "../middleware/api";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

      if (!firstName) {
        err.firstName = "First name is required.";
      }

      if (!password) {
        err.password = "Password is required.";
      } else if (password.length < 6) {
        err.password = "Password must be at least 6 characters.";
      }

      if (!confirmPassword) {
        err.confirmPassword = "Please confirm your password.";
      } else if (password !== confirmPassword) {
        err.confirmPassword = "Passwords do not match.";
      }

      if (confirmPassword !== password) {
        err.confirmPassword = "Passwords do not match.";
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

      try {
            await registerUser(firstName, lastName, email, password); 

            const responseLogin = await loginUser(email, password);
            setLoading(false);
            setSuccess(true);
            if (responseLogin.token) {
              localStorage.setItem('authToken', responseLogin.token);
              window.location.href = '/';
            }
          } catch (err) {
            setLoading(false);
            setError({ submit: err.response?.data?.message || "Registration failed. Please try again." });
          }
      setLoading(false);
      setSuccess(true);
    }

    return (
        <>
            {console.log("RegisterPage Rendered")}

            <div className="min-h-screen flex flex-col" style={{ color: 'var(--on-surface)', background: 'var(--background)' }}>

                {/* Main Content */}
                <main className="position-relative z-10 flex flex-1 items-center justify-center px-16 py-4">
                  <div className="card w-full ">
                    <>
                      {/* Form card header */}
                      <div className="text-center mb-10">
                        <h2 className="headline-lg mb-4">Create Account</h2>
                        <p className="body-md">Welcome to the aret of slow living.</p>
                      </div>

                      {/* Form fields */}
                      <div className="flex flex-col gap-0">
                        {/* name container */}
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-2 mb-6">
                            <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="firstName">First Name</label>
                            <input
                              id="firstName"
                              type="text"
                              className={`form-input${error.firstName ? " error" : ""} body-md`}
                              placeholder="John"
                              value={firstName}
                              setRequired={true}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                                if (error.firstName) setError((prev) => ({ ...prev, firstName: undefined }));
                              }}
                            />
                            {error.firstName && <span className="form-error">{error.firstName}</span>}
                          </div>

                          <div className="flex flex-col gap-2 mb-6">
                            <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="lastName">Last Name</label>
                            <input
                              id="lastName"
                              type="text"
                              className={`form-input${error.lastName ? " error" : ""} body-md`}
                              placeholder="Doe"
                              value={lastName}
                              setRequired={true}
                              onChange={(e) => {
                                setLastName(e.target.value);
                                if (error.lastName) setError((prev) => ({ ...prev, lastName: undefined }));
                              }}
                            />
                            {error.lastName && <span className="form-error">{error.lastName}</span>}
                          </div>
                        </div>

                        {/* email */}
                        <div className="flex flex-col gap-2 mb-6">
                          <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="email">Email Address</label>
                          <input
                              id="email"
                              type="email"
                              className={`form-input${error.email ? " error" : ""} body-md`}
                              placeholder="hello@example.com"
                              value={email}
                              setRequired={true}
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
                                setRequired={true}
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

                        {/* confirm password */}
                        <div className="flex flex-col gap-2 mb-6">
                          <label className="label-sm" style={{ color: 'var(--on-surface-variant)' }} htmlFor="confirmPassword">Confirm Password</label>
                          <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className={`form-input${error.confirmPassword ? " error" : ""} body-md`}
                                placeholder="••••••••"
                                value={confirmPassword}
                                setRequired={true}
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                  if (error.confirmPassword) setError((prev) => ({ ...prev, confirmPassword: undefined }));
                                }}
                                autoComplete="current-password"
                                style={{ paddingRight: '32px' }}
                              />

                              {/* toggle password visibility */}
                              <button
                                type="button"
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center p-1 transition-opacity hover:opacity-80"
                                style={{ color: 'var(--outline)' }}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                onClick={() => setShowConfirmPassword((v) => !v)}>
                                {showConfirmPassword ? <EyeIconOff /> : <EyeIcon />}
                              </button>
                          </div>
                            {error.confirmPassword && <span className="form-error">{error.confirmPassword}</span>}
                        </div>

                        {/* sign up button */}
                        <button 
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`btn-primary${loading ? " loading" : ""} label-md`}
                        >
                          {loading && <span className="spinner" />}
                          Sign Up
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
                            Sign up with Google
                          </button>
                      </div>

                      {/* sign up */}
                      <div className="items-center text-center m-6 p-2">
                        <span className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
                         already have an account? 
                          <a href="/sign-in" className="text-primary label-md-sr hover:underline mx-2 transition-colors duration-300">
                            Sign in
                          </a>
                        </span>
                      </div>
                    </>
                  </div>
                </main>

            </div>
        </>
    )
}