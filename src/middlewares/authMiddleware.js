import  jwt  from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.auth;

    if(!token) {
        res.locals.isAuthenticated = false;
        return next();
    }

    try {
        const userData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = userData;
        res.locals.user = userData;
        res.locals.isAuthenticated = true;
    } catch (error) {
        res.clearCookie('auth');
        res.locals.isAuthenticated = false;
    }

    next();
}