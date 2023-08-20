// @ts-nocheck
const { StudentDAO } = require("../services/DatabaseServices");
const { StatusCodes } = require("http-status-codes");

const studentDAO = new StudentDAO();

class StudentController {
    static async post(req, res, next) {
        try {
            const student = await studentDAO.createRegister(req.body);
            res.status(StatusCodes.CREATED).json({ uuid: student.uuid });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const message = await studentDAO.login(email, password);

            res.status(StatusCodes.OK).json(message);
        } catch (error) {
            next(error);
        }
    }

    static async get(req, res, next) {
        try {
            const students = await studentDAO.getAllRegisters();
            res.status(StatusCodes.OK).json(students);
        } catch (error) {
            next(error);
        }
    }

    static async getByUuid(req, res, next) {
        try {
            const student = await studentDAO.getRegisterByUuid(req.params.uuid);
            res.status(StatusCodes.OK).json(student);
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req, res, next) {
        try {
            const { studentUuid } = req.headers;
            if (studentUuid == "MyAdmin:D") {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({message: "Not allowed for admin"});
            } else {
                const student = await studentDAO.getRegisterByUuid(studentUuid);
                res.status(StatusCodes.OK).json(student);
            }
        } catch (error) {
            next(error);
        }
    }

    static async del(req, res, next) {
        try {
            await studentDAO.deleteRegister(req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }

    static async put(req, res, next) {
        try {
            await studentDAO.updateRegister(req.body, req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StudentController;