const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title : String,
    description: String,
    createdAt: { type: Date },
    updatedAt: { type: Date },
}, {
    toJSON: {virtuals: true, getters: true},
    timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema, 'tasks');