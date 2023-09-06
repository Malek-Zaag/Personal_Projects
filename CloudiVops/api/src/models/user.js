const mongoose = require("mongoose");
const md5 = require("md5");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "please enter a username"],
  },
  firstname: {
    type: String,
    required: [true, "please enter a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "please enter a lastname"],
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: [true, "please enter another email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
  },
  subscription_id: {
    type: String,
    required: [true, "please enter a valid subsrciption_id"],
  },
});

UserSchema.pre("save", async function (next) {
  this.password = md5(this.password);
  next();
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
