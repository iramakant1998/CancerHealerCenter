const mongoose = require("mongoose");

const BillingSchema = new mongoose.Schema(
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
    billingAmount: {
      type: Number,
      required: true,
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Billing = mongoose.model("Billing", BillingSchema);

module.exports = Billing;
