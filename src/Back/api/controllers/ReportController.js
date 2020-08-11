const Report = require("../models/Report");
const ip = require("ip");

const addReport = async (req, res, next) => {
  const email = req.params.email.toLowerCase().trim();

  try {
    const date_time = new Date();
    const userIp = ip.address();

    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`;
    const stringDate = formattedDate.toString();

    console.log(formattedDate);
    let newReport = new Report({
      email,
      state: req.body.state.toLowerCase().trim(),
      city: req.body.city.toLowerCase().trim(),
      have_electricity: req.body.have_electricity,
      userIpAddress: "",
      date: "",
    });

    newReport.date = stringDate;
    newReport.userIpAddress = userIp;

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

    let updateData = {
      _id: reportId,
      email: req.body.email,
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

    //Check if the request email is the same as the email in the report stored in the database.
    if (req.body.email !== report.email) {
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
    const reports = await Report.find().sort({ createdAt: -1 }).limit(50);
    const reportsFiltered = filterReports(reports);

    res.send(reportsFiltered);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const getReports24hours = async (req, res) => {
  try {
    const reports = await Report.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(50);

    const filteredReports = filterReports(reports);

    res.json(filteredReports);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

function filterReports(arrReports) {
  const emails = [];
  const reportsFiltered = [];

  arrReports.forEach((report) => {
    const email = report.email;
    if (emails.includes(email)) {
      return;
    } else {
      emails.push(email);
      reportsFiltered.push(report);
    }
  });

  return reportsFiltered;
}

module.exports = {
  addReport,
  getAllReports,
  updateReport,
  deleteReport,
  getReports24hours,
};
