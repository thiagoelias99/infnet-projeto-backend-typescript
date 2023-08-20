const { JWTServices } = require("../../services");
const { JWTError } = require("../../../errors");

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return next(new JWTError("Authorization not found in request header"));
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return next(new JWTError("Invalid Token"));
    }

    try {
        const decodedData = JWTServices.verify(token);
        req.headers.studentUuid = decodedData;
        return next();
    } catch (error) {
        return next(new JWTError("Invalid Token"));
    }
};

module.exports = authentication;
