// utils/tokenUtils.js
export const clearIfExpired = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('authToken');
        }
    } catch {
        localStorage.removeItem('authToken');
    }
};