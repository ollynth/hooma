import jwtUtils from "../utils/jwtUtils";

const renewToken = async (req, res, next) => {
    const authHeader = req.header.authorization;
    if ( !authHeader?.startsWith('Bearer ')) {
        console.warn('No token provided for renewal.');
        return res.status(401).json({ message: 'Access token is missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwtutils.verifyToken(token);
        req.user = decoded;

        const now = Math.floor(Date.now()/ 1000);
        const timeRemaining = decoded.exp - now;
        const thresholdSeconds = process.env.RENEW_JWT_THRESHOLD * 24 * 60 * 60;

        if (timeRemaining < thresholdSeconds) {
            const newToken = jwtUtils.generateToken({ _id: decoded.userId,  role: decoded.role });
            res.setHeader('X-Renewed-Token', newToken);
        }

        next();
    } catch (error) {
        console.error('Error during token renewal:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default renewToken;