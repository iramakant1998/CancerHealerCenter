const DoctorRecord = require("../models/doctorRecord.model");
const Patient = require("../models/Patient.model");

// Create a new doctor record
exports.createDoctorRecord = async (req, res) => {
  try {
    const { patientId, caseHistory, medicalHistory, vitals, symptoms, notes } =
      req.body;

    // Fetch patient details from the Patient collection
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newDoctorRecord = new DoctorRecord({
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
      caseHistory,
      medicalHistory,
      vitals,
      symptoms,
      notes,
    });

    const savedDoctorRecord = await newDoctorRecord.save();
    res.status(201).json(savedDoctorRecord);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor record", error });
  }
};

// Get all doctor records
exports.getAllDoctorRecords = async (req, res) => {
  try {
    const doctorRecords = await DoctorRecord.find().populate("patientId");
    res.status(200).json(doctorRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor records", error });
  }
};

// Get a doctor record by ID
exports.getDoctorRecordById = async (req, res) => {
  try {
    const doctorRecord = await DoctorRecord.findById(req.params.id).populate(
      "patient"
    );
    if (!doctorRecord) {
      return res.status(404).json({ message: "Doctor record not found" });
    }
    res.status(200).json(doctorRecord);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor record", error });
  }
};

// Update a doctor record by ID
exports.updateDoctorRecord = async (req, res) => {
  try {
    const updatedDoctorRecord = await DoctorRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDoctorRecord) {
      return res.status(404).json({ message: "Doctor record not found" });
    }
    res.status(200).json(updatedDoctorRecord);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor record", error });
  }
};

// Delete a doctor record by ID
exports.deleteDoctorRecord = async (req, res) => {
  try {
    const deletedDoctorRecord = await DoctorRecord.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDoctorRecord) {
      return res.status(404).json({ message: "Doctor record not found" });
    }
    res
      .status(200)
      .json({
        message: "Doctor record deleted successfully",
        doctorRecord: deletedDoctorRecord,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor record", error });
  }
};
