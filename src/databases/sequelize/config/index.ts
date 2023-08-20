import { Sequelize } from "sequelize";
import studentModel from "../models/Student";
import courseModel from "../models/Course";
import {runSeed as seed} from "../seeds/0001";
import * as dotenv from "dotenv";
import { Options, DataTypes } from "sequelize";
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

const Student = studentModel(sequelize, DataTypes);
const Course = courseModel(sequelize, DataTypes);

const db = {
    Student,
    Course,
    sequelize,
    Sequelize
};

Student.belongsToMany(Course, { through: "StudentsCourses" });
Course.belongsToMany(Student, {  through: "StudentsCourses"});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

let conn;

try {
    sequelize.sync({ force: false })
        .then(() => {
            console.log(`Database ${dbConfig.database} connection Ok :D`);
            if (process.env.RUN_SEED) {
                seed(Student, Course);
            }
        });
}
catch (error) {
    console.log(error);
}
finally {
    if (conn) conn.release();
}

export = db