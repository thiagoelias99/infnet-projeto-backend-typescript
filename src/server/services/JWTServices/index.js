const jwt = require("jsonwebtoken");

const { JWTError } = require("../../../errors")

const sign = (data) => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found in .env");
    return jwt.sign(data, process.env.JWT_SECRET);
};

const verify = (token) => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found in .env");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decodedData !== "string") {
        throw new JWTError("Invalid Token")
    }
    return decodedData;
};

module.exports = {
    sign,
    verify,
};