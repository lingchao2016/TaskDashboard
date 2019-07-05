const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  subject: String,
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  _assignTo: { type: Schema.Types.ObjectId, ref: 'User'},
  createdDate: Date,
  taskDate: {type: Number, default:0},
  taskType: {type: Number, default:0},
  completedPct: {type: Number, default:0},
  status: {type: Number, default:1}
});

mongoose.model('tasks', taskSchema);
