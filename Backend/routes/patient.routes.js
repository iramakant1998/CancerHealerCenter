const express = require("express");
const router = express.Router();
const patientController = require("../controller/patient.controller");

// Create a new patient
router.post("/patients", patientController.createPatient);

// Get all patients
router.get("/patients", patientController.getAllPatients);

router.post("/followup", patientController.createFollowUp);

// Get a patient by ID
router.get("/patients/:id", patientController.getPatientById);

// Update a patient by ID
router.put("/patients/:id", patientController.updatePatient);

// Delete a patient by ID
router.delete("/patients/:id", patientController.deletePatient);

module.exports = router;
