const { ValidationError } = require('sequelize');

const { Student, Course } = require('../../../databases/sequelize/config')
const { CryptServices } = require("../CryptServices")
const { LoginError, IdError } = require("../../../errors")
const { sign } = require("../JWTServices")
const BaseDAO = require('./BaseDAO');
const { EmailError } = require('../../../errors')

class StudentDAO extends BaseDAO {
    constructor() {
        super('Student')
    }

    async createRegister(student) {
        try {
            student.password = await CryptServices.hashPassword(student.password);
            const studentDb = await Student.create(student)
            return studentDb
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new EmailError()
            } else {
                throw error
            }
        }

    }

    async updateRegister(student, uuid, transaction = {}) {
        try {
            student.password = await CryptServices.hashPassword(student.password);
            // @ts-ignore
            student = await Student.update(student, { where: { uuid } }, transaction)
            if (!student.uuid) { throw new IdError }
            return student           
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new EmailError()
            } else {
                throw error
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
        })
        if (!student) { throw new IdError }
        return student

    }

    async login(email, password) {
        try {
            let jwt = ""
            if (email == "admin@email.com") {
                if (password == "Admin123") {
                    jwt = sign("MyAdmin:D")
                } else {
                    throw new LoginError()
                }
                
            } else {
                const student = await Student.scope("withPassword").findOne({ where: { email } })

                if (!student) throw new LoginError();
                // @ts-ignore
                if (!await CryptServices.verifyPassword(password, student.password)) throw new LoginError();

                // @ts-ignore
                jwt = sign(student.uuid)
            }

            return (
                {
                    message: "Login successfully done! Please use the following token in header requests for authentication.",
                    tokenType: "Bearer",
                    jwt
                }
            );

        } catch (error) {
            throw error
        };
    };
};

module.exports = StudentDAO