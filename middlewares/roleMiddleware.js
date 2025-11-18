let roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.send({ status: 0, message: "Unauthorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.send({
                status: 0,
                message: "Access denied. You do not have permission."
            });
        }

        next();
    };
};

module.exports = roleMiddleware;
