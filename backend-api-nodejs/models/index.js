const mongoose = require("mongoose");
const tasks = require("./task.model");
const db = {
  mongoose,
  tasks,
};

module.exports = db;
