import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import Joi from "joi";
import { EmailError, IdError, JWTError, LoginError } from "../../../errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Error Handler...");
    console.log(err);

    if (err instanceof Joi.ValidationError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.details[0].message }); return; }

    if (err instanceof EmailError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); return; }

    if (err instanceof IdError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); return; }

    if (err instanceof JWTError) { res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message }); return; }

    if (err instanceof LoginError) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message }); return;
    }

    if (err instanceof SyntaxError) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid body structure" });
    }
    console.log("...Server is up...");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export default errorHandler;