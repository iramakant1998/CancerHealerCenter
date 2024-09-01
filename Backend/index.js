const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const patientRoutes = require("./routes/patient.routes");
const billingRoutes = require("./routes/billing.routes");
const doctorRecordRoutes = require("./routes/doctorRecord.routes");
const excelRoutes = require("./routes/excel.routes");
const cancerExcelRoutes = require("./routes/cancerExcel.routes");
const fileUpload = require("express-fileupload");

const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
// Routes
const prescriptionRoutes = require("./routes/prescriptionroutes");
app.use("/api/prescription", prescriptionRoutes);
app.use("/api", patientRoutes);
app.use("/api", billingRoutes);
app.use("/api/doctor-records", doctorRecordRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/canceExcel", cancerExcelRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
