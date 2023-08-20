const { StatusCodes } = require("http-status-codes");

const Joi = require("joi");
const {
    EmailError,
    IdError,
    JWTError,
    LoginError
} = require("../../../errors");

const errorHandler = (err, req, res, next) => {
    console.log("Error Handler...");
    console.log(err);
    
    if (err instanceof Joi.ValidationError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.details[0].message }); return; }

    if (err instanceof EmailError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); return; }
    
    if (err instanceof IdError) { res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); return; }
    
    if (err instanceof JWTError) { res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message }); return; }

    if (err instanceof LoginError) { 
        res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message }); return; }

    if (err instanceof SyntaxError){
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid body structure"});
    }
    console.log("...Server is up...");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

module.exports = errorHandler;