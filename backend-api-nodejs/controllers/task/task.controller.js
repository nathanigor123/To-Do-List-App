const db = require("../../models");
const api = require("../../utils/api.response.formatting");

exports.index = async (req, res) => {
    const tasks = await db.tasks.find({});
    api.successResponse(res, tasks);
};

exports.show = async (req, res) => {
  try {
    const task = await db.tasks.findOne({ _id: req.params.taskId }).exec();
    api.successResponse(res, task);
  } catch (err) {
    console.log(err);
    api.errorResponse(res, err, 500);
  }
};

exports.store = async (req, res) => {
  try {
    const taskData = {
      title: req.body.title,
      description: req.body.description,
    };
    const task = await db.tasks.create(taskData);
    api.successResponse(res, task);
  } catch (err) {
    console.log(err);
    api.errorResponse(res, err, 500);
  }
};

exports.update = async (req, res) => {
  try {
    const task = await db.tasks.findOneAndUpdate(
      { _id: req.params.taskId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    );

    api.successResponse(res, task);
  } catch (err) {
    console.log(err);
    api.errorResponse(res, err, 500);
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await db.tasks.findOneAndDelete({ _id: req.params.taskId});
    api.successResponse(res, task);
  } catch (err) {
    console.log(err);
    api.errorResponse(res, err, 500);
  }
};
