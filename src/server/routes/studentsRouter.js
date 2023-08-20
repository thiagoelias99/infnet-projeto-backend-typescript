const express = require("express");
const router = express.Router();

const { RequestValidator, Authentication, AdminAuthentication } = require("../middlewares");
const path = "/students";
const { StudentController } = require("../controllers");

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

module.exports = router;