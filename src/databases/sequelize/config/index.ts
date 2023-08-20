// const mariadb = require('mariadb');
import { Sequelize } from "sequelize";
import {runSeed as seed} from "../seeds/0001";
import * as dotenv from 'dotenv';
import { Options, DataTypes } from "sequelize";
dotenv.config();

// import process
// const Sequelize = require('sequelize');
// const process = require('process');
// const dotenv = require("dotenv");
// const seed = require('../seeds/0001')


const dbConfig: Options = {
  dialect: 'sqlite',
  storage: './mydb.sqlite',
  define: {
    timestamps: true,
    underscored: true
  }
}

let sequelize: Sequelize = new Sequelize(dbConfig)

const Student = require("../models/Student")(sequelize, DataTypes);
// const Student = require("../models/Student")(sequelize, Sequelize.DataTypes);
// const Course = require("../models/Course")(sequelize, Sequelize.DataTypes);
const Course = require("../models/Course")(sequelize, DataTypes);

const db = {
  Student,
  Course,
  sequelize,
  Sequelize
};

//Run associations
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
Student.belongsToMany(Course, { through: "StudentsCourses" })
Course.belongsToMany(Student, {  through: "StudentsCourses"})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

let conn;

try {
  sequelize.sync({ force: false })
  .then(_ => {
    console.log(`Database ${dbConfig.database} connection Ok :D`)
    if (process.env.RUN_SEED) {
      seed(Student, Course)
    }
  })
}
catch (error) {
  console.log(error);
}
finally {
  if (conn) conn.release();
}

export = db