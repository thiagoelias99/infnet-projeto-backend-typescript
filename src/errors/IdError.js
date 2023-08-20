class IdError extends Error {
    constructor(message = "Invalid Uuid") {
        super(message);
    }
}

module.exports = IdError;