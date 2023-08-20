const { JWTServices } = require("../../services");
const { JWTError } = require("../../../errors")

const AdminAuthentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new JWTError("Authorization not found in request header"))
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return next(new JWTError("Invalid Token"))
    }

    try {
        const decodedData = JWTServices.verify(token);
        if (decodedData != "MyAdmin:D") {
            next(new JWTError("Only available for admin user"))
        }
        return next();
    } catch (error) {
        return next(new JWTError("Invalid Token"))
    }
};

module.exports = AdminAuthentication;
