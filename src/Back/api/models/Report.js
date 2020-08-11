const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    have_electricity: {
      type: Boolean,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userIpAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
