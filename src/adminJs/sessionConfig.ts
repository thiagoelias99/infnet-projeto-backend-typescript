import sqliteStoreFactory from "express-session-sqlite";
import session from "express-session";
import * as sqlite3 from "sqlite3";

const sqliteStore = sqliteStoreFactory(session);

const SECRET = process.env.SECRET || "NOSECRET";
const COOKIE = process.env.COOKIE || "apiTypeTelias";
const DATABASE = process.env.DATABASE_NAME || "infnet_telias";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sessionStore: any | null = null;

// setTimeout(() => {
sessionStore = new sqliteStore({
    driver: sqlite3.Database,
    path: `./${DATABASE}.sqlite`,
    ttl: 3600000,
});
// }, 1000);

export const sessionConfig = {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: SECRET,
    name: COOKIE
};