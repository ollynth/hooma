import jwtUtils from "../utils/jwtUtils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try {

        const { firstName, lastName, email, password, profile } = req.body;

        // Validate required fields
        if (!firstName || !email || !password) {
            return res.status(400).json({
                message: 'Please provide all required fields.'
            });
        }

        // Generate username
        const randomNumber = Math.floor(1000 + Math.random() * 9000);

        const username =
            `${firstName}${lastName || ''}${randomNumber}`
                .replace(/\s+/g, '')
                .toLowerCase();

        // Check existing email or username
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Username or email already in use.'
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            passwordHash: hashedPassword,
            profile,
            role: 'customer'
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
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

        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

const loginUser = async(req, res) => {
    try {
        const {identifier, password} = req.body;

        if (!identifier || !password) {
            return res.status(400).json({message: 'Please provide both identifier and password.'});
        }

        // Find by username OR email
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (!user) {
            return res.status(401).json({message: "Invalid Credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const token = jwtUtils.generateToken(user);

        const userInfo = {
            id: user._id,
            username: user.username,
            role: user.role,
            profile: user.profile
        }

        res.status(200).json({
            message: "Login successful",
            token,
            user: userInfo
        });
        console.log(`User ${user.username} logged in successfully.`);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {registerUser, loginUser};