var mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/jwt");
const serverSecret = config.secret;

const { Schema } = mongoose;

var UsersInfo = new Schema(
  {
    // objectId: { type: String },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    tokens: {
      type: String,
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    designationId: {
      type: String,
    },
    role: {
      type: String,
    },
    managerId: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    forgetPasswordToken: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    // userId: {
    //     type: String
    // }
  },
  { timestamps: true }
);

UsersInfo.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(user.password, salt);
    user.password = hash;
  }
  next();
});

UsersInfo.methods.comparePassword = function (password) {
  const user = this;
  return bcryptjs.compareSync(password, user.password);
};

UsersInfo.methods.generateToken = function () {
  const user = this;
  const { _id } = user;
  const token = jwt.sign({ _id }, serverSecret, {
    expiresIn: "10h", // it will be expired after 10 hours
    //expiresIn: "20d" // it will be expired after 20 days
    // expiresIn: 120 // it will be expired after 120ms
    // expiresIn: "120s" // it will be expired after 120s
  });
  user.tokens = token;
  return user.save().then(() => token);
};

UsersInfo.statics.removeToken = function (token) {
  const User = this;
  decoded = jwt.verify(token, serverSecret);

  return User.findOneAndUpdate(
    { _id: decoded._id },
    { $pull: { tokens: token } }
  );
};

const UsersSchema = mongoose.model("UsersInfo", UsersInfo);
module.exports = UsersSchema;
