const Joi = require("joi");

const Course = Joi.object({
    uuid: Joi.string().guid({ version: "uuidv4" }),
    description: Joi.string().required(),
    courseHours: Joi.number().integer().required(),
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

module.exports = Course;