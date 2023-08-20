import { RequestHandler } from "express";
import { JWTServices } from "../../services";
import { JWTError } from "../../../errors";

const AdminAuthentication: RequestHandler = async (req, res, next) => {
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
        if (decodedData != "MyAdmin:D") {
            next(new JWTError("Only available for admin user"));
        }
        return next();
    } catch (error) {
        return next(new JWTError("Invalid Token"));
    }
};

export default AdminAuthentication;
