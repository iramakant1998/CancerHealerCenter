const Patient = require("../models/Patient.model");
const cloudinary = require('cloudinary').v2;

// Create a new patient
const uploadReport = async (file) => {
  const image = await cloudinary.uploader.upload(file, {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return image;
};

exports.createPatient = async (req, res) => {
  try {
    const { name, age, sex, phone, email, consent, visited, doctorName, consultationFee } = req.body;
    
    // Upload reports if any
    const reportFiles = req.files?.reports;

// Ensure reportFiles is always an array
const normalizedReportFiles = Array.isArray(reportFiles) ? reportFiles : [reportFiles];

console.log(normalizedReportFiles.length);

const reportUrls = [];

if (normalizedReportFiles.length > 0) {
  for (const file of normalizedReportFiles) {
    const cloudFile = await uploadReport(file.tempFilePath);
    console.log(cloudFile.secure_url);
    reportUrls.push(cloudFile.secure_url);
  }
}

    // Create new patient
    const newPatient = new Patient({
      name,
      age,
      sex,
      phone,
      email,
      consent,
      visited,
      doctorName,
      reports: reportUrls, // Save the report URLs
      consultationFee,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error });
  }
};


exports.createFollowUp = async (req, res) => {
  try {
     const { phone, followUpReason, doctorName, consultationFee } = req.body;

    // Check if the patient exists
    const existingPatient = await Patient.findOne({ phone:req.body.phone });

    if (!existingPatient) {
      return res.status(404).json({ message: "Patient not found. Please create a new patient record first." });
    }
    const reportFiles = req.files?.reports;

    // Ensure reportFiles is always an array
    const normalizedReportFiles = Array.isArray(reportFiles) ? reportFiles : [reportFiles];
    
    console.log(normalizedReportFiles.length);
    
    const reportUrls = [];
    
    if (normalizedReportFiles.length > 0) {
      for (const file of normalizedReportFiles) {
        const cloudFile = await uploadReport(file.tempFilePath);
        console.log(cloudFile.secure_url);
        reportUrls.push(cloudFile.secure_url);
      }
    }
    // If patient exists, create a follow-up entry
    const followUp = {
      reason: followUpReason,
      doctorName,
      consultationFee,
    };

    existingPatient.reports= reportUrls
    existingPatient.followUps = existingPatient.followUps || [];
    existingPatient.followUps.push(followUp);

    const updatedPatient = await existingPatient.save();
    res.status(201).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error creating follow-up", error });
  }
};


// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// Get a patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// Update a patient by ID
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};




