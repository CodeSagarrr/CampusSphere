export const authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ message: "User not found in request token missing" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied: Unauthorized Role" });
        }
        next();
    }
}