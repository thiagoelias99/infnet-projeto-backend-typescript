import * as jwt from "jsonwebtoken";
import { JWTError } from "../../../errors";

interface IJwtData {
    uuid: string;
}

const SECRET = process.env.SECRET || "NOSECRET";

const sign = (data: IJwtData) => {
    return jwt.sign(data, SECRET);
};

const verify = (token: string): string => {
    const decodedData = jwt.verify(token, SECRET);
    if (typeof decodedData !== "string") {
        throw new JWTError("Invalid Token");
    }
    return decodedData;
};

export = {
    sign,
    verify,
};