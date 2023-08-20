const moment = require('moment')
const { Op } = require("sequelize");

const { Student, Course } = require('../../../databases/sequelize/config')
const BaseDAO = require('./BaseDAO')
const { IdError } = require('../../../errors')

class CourseDAO extends BaseDAO {
    constructor() {
        super('Course')
    }

    async subscribeStudent(studentUuid, courseUuid) {
        const student = await Student.findByPk(studentUuid)
        const course = await Course.findByPk(courseUuid)

        if (student && course) {
            course.addStudent(student)
        } else {
            throw new IdError
        }
    }

    async unsubscribeStudent(studentUuid, courseUuid) {
        const student = await Student.findByPk(studentUuid)
        const course = await Course.findByPk(courseUuid)

        if (student && course) {
            course.removeStudent(student)
        } else {
            throw new IdError
        }
    }

    async getRegisterByUuid(uuid) {
        const course = await Course.findByPk(uuid, {
            include: [
                {
                    model: Student,
                    through: { attributes: [] }
                }
            ],
        })
        if (!course) { throw new IdError }
        course.setDataValue("numberOfSubscribers", course.Students.length)
        course.setDataValue("courseStatus", this.getCourseStatus(course))

        return course
    }

    async getAllRegisters(where = {}) {
        const courses = await Course.findAll(
            {
                where: { ...where },
                include: [
                    {
                        model: Student,
                        attributes: ["uuid", "name"],
                        through: { attributes: [] }
                    }
                ],
            })
        courses.forEach(course => {
            course.setDataValue("numberOfSubscribers", course.Students.length)
            course.setDataValue("courseStatus", this.getCourseStatus(course))
        });

        return courses
    }

    async getAllRegistersForStudent(where = {}) {
        const courses = await Course.findAll(
            {
                where: {
                    startDate: {
                        [Op.gte]: new Date()
                    }
                },
                include: [
                    {
                        model: Student,
                        attributes: ["name"],
                        through: { attributes: [] }
                    }
                ],
            })
        courses.forEach(course => {
            course.setDataValue("numberOfSubscribers", course.Students.length)
            course.setDataValue("courseStatus", this.getCourseStatus(course))
        });

        return courses
    }

    getCourseStatus(course) {
        const today = moment()
        const startDate = moment(course.startDate)
        const finishDate = moment(course.finishDate)

        if (today.isBefore(startDate)) return "Open"
        if (today.isAfter(finishDate)) return "Finished"
        return "Started"
    }
}

module.exports = CourseDAO