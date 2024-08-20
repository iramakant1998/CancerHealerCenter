const express = require("express");
const router = express.Router();
const {
  getPrescription,
  createPrescription,
  getPrescriptionsByDocName,
  updatePrescription,
} = require("../controller/prescriptionController");

router.route("/").get(getPrescription);
router.route("/").post(createPrescription);
router.get("/doc", getPrescriptionsByDocName);
router.put("/:id", updatePrescription);

module.exports = router;
