const express = require("express");
const { StatusCodes } = require("http-status-codes");

const router = express.Router();

router.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({message: "Route not found"});
});

module.exports = router;