import jwtUtils from "../utils/jwtUtils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { issueCsrfCookie } from "../middleware/csrf.js";

const AUTH_COOKIE_NAME = "authToken";
const SIXTY_MIN = 60 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, confirmPassword } = req.body;

        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters and include 1 uppercase letter and 1 number.'
            });
        }

        // Check duplicate email separately for inline error
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use.', field: 'email' });
        }

        // Generate unique username
        let username;
        let usernameExists = true;
        while (usernameExists) {
            const randomNumber = Math.floor(1000 + Math.random() * 9000);
            username = `${firstName}${lastName}${randomNumber}`.replace(/\s+/g, '').toLowerCase();
            usernameExists = await User.findOne({ username });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            passwordHash: hashedPassword,
            role: 'customer'
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Error during registration:", error);
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const expiresIn = rememberMe ? "30d" : "60m";
        const maxAge = rememberMe ? THIRTY_DAYS : SIXTY_MIN;
        const token = jwtUtils.generateToken(user, expiresIn);

        res.cookie(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge,
            path: "/",
        });

        issueCsrfCookie(res);

        const userInfo = {
            id: user._id,
            username: user.username,
            role: user.role,
            status: user.status,
        };

        res.status(200).json({ message: "Login successful", user: userInfo });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
    res.clearCookie("csrfToken", { path: "/" });
    res.status(200).json({ message: "Logged out successfully." });
};

export { registerUser, loginUser, logoutUser };