const mongoose = require("mongoose");

const VitalsSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
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
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Vitals = mongoose.model("Vitals", VitalsSchema);

module.exports = Vitals;
