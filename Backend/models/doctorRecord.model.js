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
   
    symptoms: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    
    nextFollowUpDate: { type: Date }, // New field for next follow-up date

  },
  
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const DoctorRecord = mongoose.model("DoctorRecord", DoctorRecordSchema);

module.exports = DoctorRecord;
