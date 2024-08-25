const express = require("express");
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const excelController = require("../controller/excelUpload.controller");

// upload a new excel file
router.post("/upload",  upload.single('file'), excelController.uploadExcel);
router.get("/filter", excelController.filterData);


module.exports = router;
