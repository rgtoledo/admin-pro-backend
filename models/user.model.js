const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, pass, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("User", UserSchema);
