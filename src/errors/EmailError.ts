export class EmailError extends Error {
    constructor(message = "Email already registered") {
        super(message);
    }
}