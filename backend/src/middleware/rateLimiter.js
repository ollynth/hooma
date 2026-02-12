import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute.",
    retryAfter: 60, // in seconds
});

export default rateLimiter;