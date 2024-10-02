const Vitals = require("../models/vitalModel");
const Patient = require("../models/Patient.model");

exports.addVitals = async (req, res) => {
  try {
    const { phone, bloodPressure, height, weight, sugar, others } = req.body;

    const patient = await Patient.findOne({ phone });;
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newVitals = new Vitals({
      patient: patient._id,
      bloodPressure,
      height,
      weight,
      sugar,
      others,
    });
    
    await newVitals.save();
    
    await Patient.findByIdAndUpdate(
      patient._id,
      { $push: { vitals: newVitals._id } },
      { new: true }
    );
    
    res.status(201).json({
      message: "Vitals added successfully",
      vitals: newVitals,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding vitals", error });
  }
};
