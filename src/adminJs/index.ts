import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";

import { Student } from "../databases/sequelize/models/student.entity";
import { Course } from "../databases/sequelize/models/course.entity";
import { authenticationConfig } from "./authenticationConfig";
import { sessionConfig } from "./sessionConfig";

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const adminOptions = {
    resources: [Student, Course],
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    authenticationConfig,
    null,
    sessionConfig
);

export {
    admin,
    adminRouter
};