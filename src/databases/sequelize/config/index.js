'use strict';

// const mariadb = require('mariadb');
const Sequelize = require('sequelize');
const process = require('process');
const dotenv = require("dotenv");
const seed = require('../seeds/0001')
dotenv.config()

const dbConfig = {
  dialect: 'sqlite',
  storage: './mydb.sqlite',
  define: {
    timestamps: true,
    underscored: true
  }
}

let sequelize = new Sequelize(dbConfig)

const Student = require("../models/Student")(sequelize, Sequelize.DataTypes);
const Course = require("../models/Course")(sequelize, Sequelize.DataTypes);

const db = {
  Student,
  Course
};

//Run associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Check database & Sequelize connection
// const pool = mariadb.createPool(
//   {
//     host: dbConfig.host,
//     port: dbConfig.port,
//     user: dbConfig.username,
//     password: dbConfig.password,
//     connectionLimit: 100
//   }
// )

let conn;
// try {
//   pool.getConnection()
//     .then(connection => {
//       connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`)
//     })
//     .then(async () => {
//       await sequelize.sync({ force: false })
//     })
//     .then(() => {
//       console.log(`Database ${dbConfig.database} connection Ok :D`)

//       if (process.env.RUN_SEED) {
//         seed(Student, Course)
//       }
//     })
// }
// catch (error) {
//   console.log(error);
// }
// finally {
//   if (conn) conn.release();
// }

try {
  sequelize.sync({ force: false })
  .then(_ => {
    console.log(`Database ${dbConfig.database} connection Ok :D`)
    if (process.env.RUN_SEED) {
      seed(Student, Course)
      .then(_ => console.log("Seeds run Ok :D"))
    }
  })
}
catch (error) {
  console.log(error);
}
finally {
  if (conn) conn.release();
}

module.exports = db;