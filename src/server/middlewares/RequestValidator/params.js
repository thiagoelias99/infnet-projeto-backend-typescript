const { ReqParams } = require("./models");

const params = (req, res, next) => {
    const { error } = ReqParams.validate(req.params);
    if (error) {
        next(error);
    }
    next();
};

module.exports = params;