const DEFAULT_ADMIN = {
    email: process.env.DEFAULT_ADMIN_EMAIL || "admin@email.com",
    password: process.env.DEFAULT_ADMIN_PASSWORD || "Admin123",
};

const SECRET = process.env.SECRET || "NOSECRET";
const COOKIE = process.env.COOKIE || "apiTypeTelias";

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

export const authenticationConfig = {
    authenticate,
    cookieName: COOKIE,
    cookiePassword: SECRET
};
