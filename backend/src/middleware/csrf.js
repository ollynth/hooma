import crypto from "crypto";

const CSRF_COOKIE_NAME = "csrfToken";
const CSRF_HEADER_NAME = "x-csrf-token";

const CSRF_EXEMPT_PATHS = [
    "/auth/register",
    "/auth/login",
];

function issueCsrfCookie(res) {
    const csrfToken = crypto.randomBytes(32).toString("hex");
    res.cookie(CSRF_COOKIE_NAME, csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    return csrfToken;
}

function verifyCsrfToken(req, res, next) {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
    if (CSRF_EXEMPT_PATHS.includes(req.path)) return next();

    console.log("Cookies:", req.cookies);
    console.log("Header:", req.headers["x-csrf-token"]);

    const cookieToken = req.cookies?.csrfToken;
    const headerToken = req.headers["x-csrf-token"];

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        return res.status(403).json({ message: "Invalid or missing CSRF token." });
    }

    next();
}

export { issueCsrfCookie, verifyCsrfToken, CSRF_COOKIE_NAME, CSRF_HEADER_NAME };