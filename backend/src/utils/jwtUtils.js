import jwt from "jsonwebtoken";

function generateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export default generateToken;