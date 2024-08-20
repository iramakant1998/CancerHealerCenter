const mongoose = require("mongoose");

const DoctorRecordSchema = new mongoose.Schema(
  {
    patient: {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      consent: { type: Boolean, required: true },
      doctorName: { type: String, required: true },
      consultationFee: { type: Number, required: true },
    },
    caseHistory: {
      type: String,
      required: true,
    },
    medicalHistory: {
      previousTreatment: {
        type: String,
        required: true,
      },
      ongoingTreatment: {
        type: String,
        required: true,
      },
    },
    vitals: {
      bloodPressure: {
        type: String,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      sugar: {
        type: Number,
        required: true,
      },
      others: {
        type: String,
      },
    },
    symptoms: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const DoctorRecord = mongoose.model("DoctorRecord", DoctorRecordSchema);

module.exports = DoctorRecord;
