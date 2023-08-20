import { RequestHandler } from "express";
import { ReqParams } from "./models";

const params: RequestHandler = (req, res, next) => {
    const { error } = ReqParams.validate(req.params);
    if (error) {
        next(error);
    }
    next();
};

export default params;