export class IdError extends Error {
    constructor(message = "Invalid Uuid") {
        super(message);
    }
}