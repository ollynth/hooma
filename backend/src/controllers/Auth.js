import generateToken from "../utils/jwtUtils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    try {

        const { username, email, password, profile} = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }
    
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
    
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use.' });
        }
    
        const saltRounds = 10;
        const hasedPassword = await bcrypt.hash(password, saltRounds);
    
        const newUser = new User({
            username,
            email,
            passwordHash: hasedPassword,
            profile, 
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

const loginUser = async(req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: 'Please provide both username and password.'});
        }

        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: "Invallid Credentials"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const token = generateToken(user);

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
        })
        console.log(`User ${username} logged in successfully.`);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {registerUser, loginUser};