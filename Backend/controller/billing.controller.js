const Billing = require("../models/billing.model");
const Patient = require("../models/Patient.model");

// Create a new billing record
exports.createBilling = async (req, res) => {
  try {
    const { patientId, billingAmount } = req.body;

    // Fetch patient details from the Patient collection
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create a new billing record with full patient details
    const newBilling = new Billing({
      patient: {
        name: patient.name,
        age: patient.age,
        sex: patient.sex,
        phone: patient.phone,
        email: patient.email,
        consent: patient.consent,
        doctorName: patient.doctorName,
        consultationFee: patient.consultationFee,
      },
      billingAmount,
    });

    const savedBilling = await newBilling.save();

    res.status(201).json(savedBilling);
  } catch (error) {
    res.status(500).json({ message: "Error creating billing record", error });
  }
};

// Get all billing records with patient details
exports.getAllBillings = async (req, res) => {
  try {
    const billings = await Billing.find().populate("patient");
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching billing records", error });
  }
};

// Get a billing record by ID with patient details
exports.getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate("patient");
    if (!billing) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching billing record", error });
  }
};

// Update a billing record by ID
exports.updateBilling = async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("patient");
    if (!updatedBilling) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(500).json({ message: "Error updating billing record", error });
  }
};

// Delete a billing record by ID
exports.deleteBilling = async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(
      req.params.id
    ).populate("patient");
    if (!deletedBilling) {
      return res.status(404).json({ message: "Billing record not found" });
    }
    res
      .status(200)
      .json({
        message: "Billing record deleted successfully",
        billing: deletedBilling,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting billing record", error });
  }
};
