const Report = require("../models/Report");

const addReport = async (req, res, next) => {
  try {
    const date_time = new Date();
    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
    console.log(formattedDate);

    let newReport = new Report({
      username: req.body.username,
      state: req.body.state,
      city: req.body.city,
      have_electricity: req.body.have_electricity,
      date: "",
    });

    newReport.date = formattedDate;

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
    const reports = await Report.find();
    res.send(reports);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
module.exports = { addReport, getAllReports, updateReport, deleteReport };
