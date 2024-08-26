const mongoose = require('mongoose');

// Define the schema based on the Excel headers
const cancerExcelSchema = new mongoose.Schema({
    CancerType: {
    type: String,
  },
  Symptoms: {
    type: String,
  },
  Medicines: {
    type: [String],
  }
});

// Create a Mongoose model
const CancerExcelData = mongoose.model('CancerExcelData', cancerExcelSchema);

module.exports = CancerExcelData;
