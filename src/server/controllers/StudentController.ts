/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from "express";
import StudentDAO from "../services/DatabaseServices/StudentDAO";
import { StatusCodes } from "http-status-codes";
import { IStudent } from "../../models/Student";
import { IParams } from "../models/IParams";

const studentDAO = new StudentDAO();

type RequestStudent = Request<IParams, unknown, IStudent, unknown>

class StudentController {
    static async post(req: Request<{}, {}, IStudent>, res: Response, next: NextFunction) {
        try {
            const student = await studentDAO.createRegister(req.body);
            res.status(StatusCodes.CREATED).json({ uuid: student.uuid });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request<{}, {}, IStudent>, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const message = await studentDAO.login(email, password);

            res.status(StatusCodes.OK).json(message);
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request<{}, {}, IStudent>, res: Response, next: NextFunction) {
        try {
            const students = await studentDAO.getAllRegisters();
            res.status(StatusCodes.OK).json(students);
        } catch (error) {
            next(error);
        }
    }

    static async getByUuid(req: RequestStudent, res: Response, next: NextFunction) {
        try {
            const student = await studentDAO.getRegisterByUuid(req.params.uuid);
            res.status(StatusCodes.OK).json(student);
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req: Request<{}, {}, IStudent>, res: Response, next: NextFunction) {
        try {
            const { studentUuid } = req.headers;
            if (studentUuid == "MyAdmin:D") {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Not allowed for admin" });
            } else {
                const student = await studentDAO.getRegisterByUuid(studentUuid);
                res.status(StatusCodes.OK).json(student);
            }
        } catch (error) {
            next(error);
        }
    }

    static async del(req: RequestStudent, res: Response, next: NextFunction) {
        try {
            await studentDAO.deleteRegister(req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }

    static async put(req: RequestStudent, res: Response, next: NextFunction) {
        try {
            await studentDAO.updateRegister(req.body, req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }
}

export {
    StudentController
};