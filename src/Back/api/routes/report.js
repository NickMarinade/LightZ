const express = require("express");
const router = express.Router();

const ReportController = require("../controllers/ReportController");
// const AuthController = require("../controllers/AuthController");

router.post("/", ReportController.addReport);
router.get("/", ReportController.getAllReports);
router.put("/", ReportController.updateReport);
router.delete("/", ReportController.deleteReport);
router.post("/cities", ReportController.getNumberOfReportsOfCity);

module.exports = router;
