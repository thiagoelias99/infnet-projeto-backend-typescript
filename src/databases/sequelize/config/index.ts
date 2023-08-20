import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

const dbConfig: Options = {
    dialect: "sqlite",
    storage: "./mydb.sqlite",
    define: {
        timestamps: true,
        underscored: true
    }
};

const sequelize: Sequelize = new Sequelize(dbConfig);

export {
    sequelize
};