import { courseValidation } from "../server/middlewares/RequestValidator/adminJSValidation";
import { Course } from "../databases/sequelize/models/course.entity";

const createdAtVisibility = {
    new: false,
    edit: false,
    show: true,
    list: false,
    filter: false,
};

const courseConfig = {
    resource: Course,
    options: {
        properties: {
            createdAt: { isVisible: createdAtVisibility },
            updatedAt: { isVisible: createdAtVisibility },
        },
        actions: {
            new: { before: [courseValidation] },
            edit: { before: [courseValidation] }
        }
    }
};

export default courseConfig;


