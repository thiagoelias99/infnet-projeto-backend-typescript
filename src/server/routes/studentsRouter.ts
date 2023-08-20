// @ts-nocheck
import express from "express";
const router = express.Router();

import { RequestValidator, Authentication, AdminAuthentication } from "../middlewares";
const path = "/students";
import { StudentController } from "../controllers";

router.route("/login")
    .post(RequestValidator.body, StudentController.login);

router.route(path)
    .post(RequestValidator.body, StudentController.post)
    .get(AdminAuthentication, StudentController.get);

router.route(`${path}/info`)
    .get(Authentication, StudentController.getInfo);

router.route(`${path}/:uuid`)
    .all(RequestValidator.params, AdminAuthentication)
    .get(StudentController.getByUuid)
    .put(RequestValidator.body, StudentController.put)
    .delete(StudentController.del);

export default router;