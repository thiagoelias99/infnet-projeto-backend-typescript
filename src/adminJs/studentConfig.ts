import { Student } from "../databases/sequelize/models/student.entity";
import { studentValidation } from "../server/middlewares/RequestValidator/adminJSValidation";
import { hashAdminPAssword } from "../server/middlewares/Authentication/hashAdminPAssword";

const createdAtVisibility = {
    new: false,
    edit: false,
    show: true,
    list: false,
    filter: false,
};

const studentConfig = {
    resource: Student,
    options: {
        properties: {
            password: {
                type: "password",
                isVisible: createdAtVisibility
            },
            createdAt: { 
                type: "datetime",
                isVisible: createdAtVisibility },
            updatedAt: { isVisible: createdAtVisibility },
            deletedAt: { isVisible: createdAtVisibility }
        },
        actions: {
            new: { before: [studentValidation, hashAdminPAssword] },
            edit: { before: [studentValidation, hashAdminPAssword] }
        }
    }
};

export default studentConfig;


