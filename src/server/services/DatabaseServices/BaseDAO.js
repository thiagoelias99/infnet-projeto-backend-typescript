// @ts-nocheck
const database = require("../../../databases/sequelize/config");
const { IdError } = require("../../../errors");

class BaseDAO {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async getAllRegisters(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } });
    }

    async getOneRegister(where = {}) {
        return database[this.modelName].findOne({ where: { ...where } });
    }

    async getRegisterByUuid(uuid) {
        const register = await database[this.modelName].findByPk(uuid);
        if (!register) { throw new IdError; }
        return register;
    }

    async createRegister(data) {
        return database[this.modelName].create(data);
    }

    async updateRegister(data, uuid, transaction = {}) {
        const register = await database[this.modelName]
            .update(data, { where: { uuid } }, transaction);
        if (!register.uuid) { throw new IdError; }
        return register;
    }

    async deleteRegister(uuid) {
        const register = database[this.modelName].destroy({ where: { uuid } });
        if (!register.uuid) { throw new IdError; }
        return register;
    }
}

module.exports = BaseDAO;