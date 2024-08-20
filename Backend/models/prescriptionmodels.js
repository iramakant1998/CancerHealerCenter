const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAge: {
    type: String,
    required: true,
  },
  patientSex: {
    type: String,
    required: true,
  },
  diagonsis: {
    type: String,
    required: true,
  },
  medication: {
    type : [String],
    required : true,
  },
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = Prescription;
