const Joi = require("joi");

const ReqParams = Joi.object({
uuid: Joi.string().guid({version: "uuidv4"}).required()
});

module.exports = ReqParams;