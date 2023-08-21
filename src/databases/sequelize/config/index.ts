import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

const DATABASE = process.env.DATABASE_NAME || "infnet_telias";

const dbConfig: Options = {
    dialect: "sqlite",
    storage: `./${DATABASE}.sqlite`,
    define: {
        timestamps: true,
        underscored: true
    }
};

const sequelize: Sequelize = new Sequelize(dbConfig);

export {
    sequelize
};