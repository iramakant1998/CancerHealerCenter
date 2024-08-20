const User = require("../models/prescriptionmodels");

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getPrescription = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
const createPrescription = async (req, res) => {
  const {
    docName,
    patientName,
    patientAge,
    patientSex,
    diagonsis,
    medication,
  } = req.body;

  const user = new User({
    docName,
    patientName,
    patientAge,
    patientSex,
    diagonsis,
    medication,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getPrescriptionsByDocName = async (req, res) => {
  const { docName } = req.query;

  if (!docName) {
    return res.status(400).json({ message: "Doctor name is required" });
  }

  try {
    const prescriptions = await User.find({
      docName: new RegExp(`^${docName}$`, "i"),
    });
    if (prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this doctor" });
    }
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { diagonsis, medication } = req.body;

  if (!diagonsis || !medication) {
    return res
      .status(400)
      .json({ message: "Diagnosis and medication are required" });
  }

  try {
    const prescription = await User.findByIdAndUpdate(
      id,
      { diagonsis, medication },
      { new: true, runValidators: true }
    );

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPrescription,
  createPrescription,
  getPrescriptionsByDocName,
  updatePrescription,
};
