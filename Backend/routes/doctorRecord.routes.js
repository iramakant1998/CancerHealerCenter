const express = require("express");
const router = express.Router();
const doctorRecordController = require("../controller/doctorRecord.controller");

// Create a new doctor record
router.post("/", doctorRecordController.createDoctorRecord);

// Get all doctor records
router.get("/", doctorRecordController.getAllDoctorRecords);

// Get a doctor record by ID
router.get("/:id", doctorRecordController.getDoctorRecordById);

// Update a doctor record by ID
router.put("/:id", doctorRecordController.updateDoctorRecord);

// Delete a doctor record by ID
router.delete("/:id", doctorRecordController.deleteDoctorRecord);

module.exports = router;
