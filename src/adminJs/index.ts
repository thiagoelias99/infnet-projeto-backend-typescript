import AdminJS, { AdminJSOptions, LocaleTranslations } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSSequelize from "@adminjs/sequelize";

import { authenticationConfig } from "./authenticationConfig";
import { sessionConfig } from "./sessionConfig";
import studentConfig from "./studentConfig";
import courseConfig from "./courseConfig";

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
});

const adminOptions: AdminJSOptions = {
    resources: [studentConfig, courseConfig],
    dashboard: {
        component: AdminJS.bundle("./components/Dashboard.tsx")
    },
    branding: {
        favicon: "https://cdn-icons-png.flaticon.com/512/2000/2000887.png",
        logo: "https://cdn-icons-png.flaticon.com/512/2000/2000887.png",
        companyName: "ByteCraft School"
    }
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