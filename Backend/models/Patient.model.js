const mongoose = require("mongoose");

const followUpSchema = new mongoose.Schema({
  reason: { type: String, required: true },
  doctorName: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  reports: [
    {
      type: String, // Assuming file paths or URLs for uploaded reports
    },
  ],
}, {
  timestamps: true,
});

const doctorFollowUpSchema = new mongoose.Schema({
  caseHistory: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  vitals: { type: String, required: true },
  symptoms: { type: String, required: true },
  notes: { type: String },
  nextFollowUpDate: { type: Date }

}, {
  timestamps: true,
});

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    consent: {
      type: Boolean,
      required: true,
    },
    visited: {
      type: Boolean,
      default: false,
    },
    doctorName: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: String, // Assuming file paths or URLs for uploaded reports
      },
    ],
    consultationFee: {
      type: Number,
      required: true,
    },
    followUps: [followUpSchema], // Field for follow-up entries
    doctorFollowUp: [doctorFollowUpSchema],
    vitals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vitals' }], // Vitals reference
    // New field for doctor follow-up records
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
