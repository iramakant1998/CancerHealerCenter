const express = require("express");
const router = express.Router();
const billingController = require("../controller/billing.controller");

// Create a new billing record
router.post("/billings", billingController.createBilling);

// Get all billing records
router.get("/billings", billingController.getAllBillings);

// Get a billing record by ID
router.get("/billings/:id", billingController.getBillingById);

// Update a billing record by ID
router.put("/billings/:id", billingController.updateBilling);

// Delete a billing record by ID
router.delete("/billings/:id", billingController.deleteBilling);

module.exports = router;
