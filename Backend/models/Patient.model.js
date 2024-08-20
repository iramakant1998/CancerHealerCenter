const mongoose = require("mongoose");

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
    consultationFee : {
        type: Number,
        required: true,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
