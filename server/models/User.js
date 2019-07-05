const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: Number, default: 0 },
  firstName: {type: String, default:""},
  lastName: {type: String, default:""},
  createdDate: {type: Date, default: Date.now()},
  status: {type: Number, default:1}
});

mongoose.model('users', userSchema);
