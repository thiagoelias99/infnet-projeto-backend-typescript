// @ts-nocheck
import { ValidationError } from "sequelize";

import { Student, Course } from "../../../databases/sequelize/config";
import CryptServices from "../CryptServices";
import { LoginError, IdError } from "../../../errors";
import { sign } from "../JWTServices";
import BaseDAO from "./BaseDAO";
import { EmailError } from "../../../errors";

class StudentDAO extends BaseDAO {
    constructor() {
        super("Student");
    }

    async createRegister(student) {
        try {
            student.password = await CryptServices.hashPassword(student.password);
            const studentDb = await Student.create(student);
            return studentDb;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new EmailError();
            } else {
                throw error;
            }
        }
    }

    async updateRegister(student, uuid, transaction = {}) {
        try {
            student.password = await CryptServices.hashPassword(student.password);
            student = await Student.update(student, { where: { uuid } }, transaction);
            if (!student.uuid) { throw new IdError; }
            return student;           
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new EmailError();
            } else {
                throw error;
            }
        }
    }

    async getRegisterByUuid(uuid) {
        
        const student = await Student.findByPk(uuid, {
            include: [
                {
                    model: Course,
                    through: { attributes: [] }
                }
            ],
        });
        if (!student) { throw new IdError; }
        return student;

    }

    async login(email, password) {
        // eslint-disable-next-line no-useless-catch
        try {
            let jwt = "";
            if (email == "admin@email.com") {
                if (password == "Admin123") {
                    jwt = sign("MyAdmin:D");
                } else {
                    throw new LoginError();
                }
                
            } else {
                const student = await Student.scope("withPassword").findOne({ where: { email } });

                if (!student) throw new LoginError();
                if (!await CryptServices.verifyPassword(password, student.password)) throw new LoginError();

                jwt = sign(student.uuid);
            }

            return (
                {
                    message: "Login successfully done! Please use the following token in header requests for authentication.",
                    tokenType: "Bearer",
                    jwt
                }
            );

        } catch (error) {
            throw error;
        }
    }
}

export default StudentDAO;