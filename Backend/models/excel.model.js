const mongoose = require('mongoose');

// Define the schema based on the Excel headers
const excelSchema = new mongoose.Schema({
  Type: {
    type: String,
  },
  DiseasesName: {
    type: String,
  },
  MedicineBasicLine: {
    type: String,
  },
  CHPlus: {
    type: [String],
  },
});

// Create a Mongoose model
const ExcelData = mongoose.model('ExcelData', excelSchema);

module.exports = ExcelData;
