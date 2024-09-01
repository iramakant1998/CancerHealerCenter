const Vitals = require("../models/vitalModel");
const Patient = require("../models/Patient.model");

exports.addVitals = async (req, res) => {
  try {
    const { phone, bloodPressure, height, weight, sugar, others } = req.body;

    // Check if the patient exists
    const patient = await Patient.findOne({ phone });;
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create a new vitals record linked to the patient
    const newVitals = new Vitals({
      patient: patient._id, // Reference to the patient
      bloodPressure,
      height,
      weight,
      sugar,
      others,
    });

    const savedVitals = await newVitals.save();

    res.status(201).json({
      message: "Vitals added successfully",
      vitals: savedVitals,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding vitals", error });
  }
};
