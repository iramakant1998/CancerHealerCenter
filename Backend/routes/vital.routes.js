const express = require("express");
const router = express.Router();
const {
    addVitals
} = require("../controller/vitals.controller");

router.route("/").post(addVitals);

module.exports = router;
