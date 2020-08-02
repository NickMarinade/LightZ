const Report = require("../models/Report");
const { report } = require("../routes/auth");

const addReport = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  try {
    const date_time = new Date();

    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
    const stringDate = formattedDate.toString();

    console.log(formattedDate);
    let newReport = new Report({
      username: req.body.username,
      state: req.body.state.toLowerCase().trim(),
      city: req.body.city.toLowerCase().trim(),
      have_electricity: req.body.have_electricity,
      date: "",
    });

    newReport.date = stringDate;

    await newReport.save();
    res.json({
      message: "Report added successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const updateReport = async (req, res, next) => {
  try {
    let reportId = req.body._id;

    const date_time = new Date();
    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
    console.log(formattedDate);

    let updateData = {
      _id: reportId,
      username: req.body.username,
      city: req.body.city,
      state: req.body.state,
      have_electricity: req.body.have_electricity,
      date: "",
    };

    updateData.date = formattedDate;

    await Report.findByIdAndUpdate(reportId, { $set: updateData });
    res.json({
      message: "Report updated successfully",
    });
  } catch (error) {}
};

const deleteReport = async (req, res, next) => {
  try {
    let reportId = req.body._id;
    const report = await Report.findById(reportId);

    if (!report) {
      res.status(404).json({
        message: "No report found with that ID",
      });
      return;
    }

    //Check if the request username is the same as the username in the report stored in the database.
    if (req.body.username !== report.username) {
      res.status(400).json({
        message: "You can only delete your own reports",
      });
      return;
    }

    await Report.findByIdAndRemove(reportId);

    res.json({
      message: "Report removed successfully",
    });
  } catch (error) {
    res.json({
      message: "An error ocurred",
    });
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(4);
    res.send(reports);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const getNumberOfReportsOfCity = async (req, res, next) => {
  try {
    const city = req.body.city.toLowerCase().trim();
    const state = req.body.state.toLowerCase().trim();

    const result = [];
    const reports = await Report.find();

    reports.forEach((report) => {
      if (report.state === state && report.city === city) {
        result.push(report.city);
      }

      // const state = report.state.toLowerCase().trim();
      // const city = report.city.toLowerCase().trim();
      // cityAndState.push({
      //   state: state,
      //   city: city,
      // });
    });

    res.json({
      number_of_reports: result.length,
    });

    // let mystate = cityAndState.filter((element) => element.state === state);
    // let ciudades = [];

    // mystate.forEach((report) => {
    //   const city = report.city;
    //   ciudad.push(city);
    // });

    // console.log(ciudades);

    // let cities = [];
  } catch (error) {}
};

module.exports = {
  addReport,
  getAllReports,
  updateReport,
  deleteReport,
  getNumberOfReportsOfCity,
};
