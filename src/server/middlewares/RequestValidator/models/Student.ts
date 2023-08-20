import Joi from "joi";
import { IStudent } from "../../../../models/Student";

const Student: Joi.ObjectSchema<IStudent> = Joi.object({
    uuid: Joi.string().guid({ version: "uuidv4" }),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthDate: Joi.date().required(),
    courses: Joi.array().items(
        Joi.object({
            uuid: Joi.string().guid({ version: "uuidv4" }),
            description: Joi.string().required(),
            finishDate: Joi.date().required()
        })
    ).default([])
});

export default Student;