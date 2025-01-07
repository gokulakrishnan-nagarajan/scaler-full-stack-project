const jwt = require("jsonwebtoken");

const { NOTIFICATION_TYPE } = require("../../constants/notification");

const authMiddleware = async (req, res, next) => {
    try {
        const jwtToken = req.headers.authorization.split(" ")[1];
        const verifedToken = jwt.verify(jwtToken, process.env.jwtKey);

        req.body.userId = verifedToken.userId;

        next();
    } catch (err) {
        console.log("Error", err);

        res.status(401).send({
            success: false,
            message: "Authentication failed",
            type: NOTIFICATION_TYPE.ERROR,
        });
    }
};

module.exports = authMiddleware;
