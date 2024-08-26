
const XLSX = require('xlsx');
const path = require('path');
const CancerExcelData = require('../models/cancerExcel.model'); // Adjust the path as needed
const fs = require('fs');


exports.uploadExcel = async (req, res) => {
    try {
      const filePath = path.join(__dirname,'../uploads', req.file.filename);
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      // Iterate through each row in the Excel sheet and save it to the database
      const excelRecords = sheetData.map(row => ({
        CancerType: row['CancerType'],
        Symptoms: row['Symptoms'],
        Medicines: row['Medicines'] ? row['Medicines'].split(',').map(item => item.trim()) : [], // Split by comma and trim whitespace
    }));
  
      await CancerExcelData.insertMany(excelRecords);
  
      // Remove the uploaded file after processing
      fs.unlinkSync(filePath);
  
      res.status(200).send('File uploaded and data saved to MongoDB.');
    } catch (error) {
      res.status(500).send('An error occurred: ' + error.message);
    }
  };

  exports.filterData = async (req, res) => {
    try {
        const { type, symptoms } = req.query;

        const filter = {};

        if (type) {
            filter.CancerType = type;
        }
        if (symptoms) {
            filter.Symptoms = symptoms;
        }

        const results = await CancerExcelData.find(filter);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No matching data found' });
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
