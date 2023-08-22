import Joi from "joi";
import { ICourse } from "../../../../models/Course";

const Course: Joi.ObjectSchema<ICourse> = Joi.object({
    uuid: Joi.string().guid({ version: "uuidv4" }),
    description: Joi.string().required(),
    courseHours: Joi.number().integer().min(1).required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    subscribersNumber: Joi.number().integer().default(0),
    students: Joi.array().items(
        Joi.object({
            uuid: Joi.string().guid({ version: "uuidv4" }).required(),
            name: Joi.string().required()
        })
    ).default([])
});

export default Course;