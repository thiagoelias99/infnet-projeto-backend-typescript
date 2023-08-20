import Joi from "joi";

interface ReqParams {
    uuid: string
}

const ReqParams: Joi.ObjectSchema<ReqParams> = Joi.object({
    uuid: Joi.string().guid({version: "uuidv4"}).required()
});

export default ReqParams;