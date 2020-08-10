const express = require("express");
const router = express.Router();

const {
  addReport,
  getAllReports,
  updateReport,
  deleteReport,
  getReports24hours,
} = require("../controllers/ReportController");
// const AuthController = require("../controllers/AuthController");

router.post("/:email", addReport);
router.get("/", getAllReports);
router.put("/", updateReport);
router.delete("/", deleteReport);
router.get("/24", getReports24hours);
module.exports = router;
