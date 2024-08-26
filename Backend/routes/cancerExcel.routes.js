const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const cancerExcelController = require("../controller/cancerExcel.controller");

// upload a new excel file
router.post("/upload",  upload.single('file'), cancerExcelController.uploadExcel);
router.get("/filter", cancerExcelController.filterData);


module.exports = router;
