class JWTError extends Error {
    constructor(message = "JWT Error") {
        super(message);
    }
}

module.exports = JWTError;