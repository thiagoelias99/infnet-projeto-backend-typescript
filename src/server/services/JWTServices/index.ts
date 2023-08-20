import * as jwt from "jsonwebtoken";
import { JWTError } from "../../../errors";

interface IJwtData {
    uuid: string;
}

const sign = (data: IJwtData) => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found in .env");
    return jwt.sign(data, process.env.JWT_SECRET);
};

const verify = (token: string): string => {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found in .env");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decodedData !== "string") {
        throw new JWTError("Invalid Token");
    }
    return decodedData;
};

export = {
    sign,
    verify,
};