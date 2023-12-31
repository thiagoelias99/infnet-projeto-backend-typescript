import { Request, Response, NextFunction } from "express";
import CourseDAO from "../services/DatabaseServices/CourseDAO";
import { StatusCodes } from "http-status-codes";

const courseDAO = new CourseDAO();

class CourseController {
    static async post(req: Request, res: Response, next: NextFunction) {
        try {
            const course = await courseDAO.createRegister(req.body);
            res.status(StatusCodes.CREATED).json({ uuid: course.uuid });
        } catch (error) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await courseDAO.getAllRegisters();
            res.status(StatusCodes.OK).json(courses);
        } catch (error) {
            next(error);
        }
    }

    static async getInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await courseDAO.getAllRegistersForStudent();
            res.status(StatusCodes.OK).json(courses);
        } catch (error) {
            next(error);
        }
    }

    static async getByUuid(req: Request, res: Response, next: NextFunction) {
        try {
            const course = await courseDAO.getRegisterByUuid(req.params.uuid);
            res.status(StatusCodes.OK).json(course);
        } catch (error) {
            next(error);
        }
    }

    static async del(req: Request, res: Response, next: NextFunction) {
        try {
            await courseDAO.deleteRegister(req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }

    static async put(req: Request, res: Response, next: NextFunction) {
        try {
            await courseDAO.updateRegister(req.body, req.params.uuid);
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    }

    static async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentUuid } = req.headers;
            const { uuid } = req.params;

            if (studentUuid == "MyAdmin:D") {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Not allowed for admin" });
            } else {
                await courseDAO.subscribeStudent(studentUuid, uuid);
                res.sendStatus(StatusCodes.OK);
            }

        } catch (error) {
            next(error);
        }
    }

    static async unsubscribe(req: Request, res: Response, next: NextFunction) {
        try {
            const { studentUuid } = req.headers;
            const { uuid } = req.params;

            if (studentUuid == "MyAdmin:D") {
                res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "Not allowed for admin" });
            } else {
                await courseDAO.unsubscribeStudent(studentUuid, uuid);
                res.sendStatus(StatusCodes.OK);
            }

        } catch (error) {
            next(error);
        }
    }
}

export {
    CourseController
};