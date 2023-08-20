import { sequelize } from "./config";
import { Course } from "./models/course.entity";
import { Student } from "./models/student.entity";
import { runSeed } from "./seeds/0001";

export function syncWithDatabase() {
    try {
        Student.belongsToMany(Course, { through: "StudentsCourses" });
        Course.belongsToMany(Student, { through: "StudentsCourses" });
        sequelize.sync({ force: false })
            .then(() => {
                console.log("Database connection Ok :D");
                if (process.env.RUN_SEED) {
                    runSeed(Student, Course);
                }
            });
    }
    catch (error) {
        console.log(error);
    }
}