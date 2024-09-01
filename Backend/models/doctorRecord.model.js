const mongoose = require("mongoose");

const DoctorRecordSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },

    caseHistory: {
      type: String,
      required: true,
    },
    medicalHistory: {
      previousTreatment: {
        type: String,
      },
      ongoingTreatment: {
        type: String,
      },
    },
    vitals: {
      bloodPressure: {
        type: String,
      },
      height: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      sugar: {
        type: Number,
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
