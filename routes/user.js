const express = require("express");
const router = express.Router();
const UsersInfo = require("../models/user");
const _ = require("underscore");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("../middlewares/multer");
const mailService = require("../services/mail.service");
const moment = require("moment");
const bcryptjs = require("bcryptjs");
router.post("/signUp", multer.single("profileImage"), (req, res) => {
  var usersData = req.body;
  if (usersData.objectId === "" || usersData.objectId === undefined) {
    const postusersData = new UsersInfo({
      name: usersData.name,
      email: usersData.email,
      password: usersData.password,
      token: usersData.token,
      designation: usersData.designation,
      designationId: usersData.designationId,
      role: usersData.role,
      managerId: usersData.managerId,
      profileImage: req.file.filename,
    });
    postusersData.save(function (err, data) {
      if (err) {
        res.send({
          code: 500,
          content: "Internal Server Error",
          msg: "API not called properly",
        });
      } else if (data) {
        res.send({
          code: 200,
          msg: "Data saved successfully",
          content: data,
        });
      }
    });
  }
});

router.post("/userUpdate", (req, res) => {
  var userData = req.body;
  UsersInfo.findOneAndUpdate(
    { _id: userData.objectId },
    { $set: _.omit(userData, "_id") },
    { new: true }
  )
    .then(() => {
      UsersInfo.find({ _id: userData.objectId }, function (err, documents) {
        res.send({
          error: err,
          content: documents,
          code: 200,
          msg: "data updated successfullly",
        });
      });
    })
    .catch(() => res.status(422).send({ msg: "Internal server error" }));
});

router.post("/deleteUser", (req, res) => {
  var userData = req.body;
  UsersInfo.deleteOne({ _id: userData.objectId }, function (err, docs) {
    if (err) {
      res.json(err);
    } else {
      res.send({
        code: 200,
        msg: "User data delete successfully",
        content: docs,
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UsersInfo.findOne({ email: email });
  if (!user) {
    return res.send({ message: "No user found!" });
  }

  const isAuthenticated = await user.comparePassword(password);
  if (!isAuthenticated) {
    return res.send({ message: "Invalid Password!" });
  }

  const token = await user.generateToken();
  res.header("x-auth", token);
  res.send(user);
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const user = await UsersInfo.findOne({ email: email });
  if (!user) {
    res.status(400).send({ message: "Invalid Email!" });
  } else {
    const otp = Date.now().toString().slice(-6);
    const temp = await UsersInfo.findByIdAndUpdate(
      user.id,
      {
        forgetPasswordToken: otp,
      },
      //new stands for new object
      { new: true }
    );
    console.log(temp);
    mailService.forgotPasswordThroughNodeMailer({
      email: user.email,
      token: otp,
    });
    res
      .status(200)
      .send({ message: "Email Verification Code sent to your Email" });
  }
});

router.get("/all", verifyToken, (req, res) => {
  const users = UsersInfo.find();
  users
    .then((data, err) => {
      // res.set('Access-Control-Allow-Origin', '*');
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
// router.get('/all', verifyToken, (req, res) => {
//     const users = UsersInfo.find();
//     users.then((data, err) => {
//         // res.set('Access-Control-Allow-Origin', '*');
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send(err)
//     });

// })
router.post("/activateID", async (req, res) => {
  console.log(req.body, "<==body");
  const user = await UsersInfo.findOne({ forgetPasswordToken: req.body.otp });
  console.log(user, "<-------user jNI");
  if (!user) {
    res.status(401).send("Wrong Email Verfication Code");
  } else {
    const diffInMinutes = moment().diff(moment(user.updatedAt), "minutes");

    if (diffInMinutes > 5) {
      const chk = await resendOTPById(user.id);
      res
        .staus(401)
        .send(
          "the OTP you sent has been expired. New OTP has been sent to your account"
        );
    }
    const activatedUser = await UsersInfo.findByIdAndUpdate(
      user.id,
      { forgetPasswordToken: null },
      { new: true }
    );
    res.status(200).send(activatedUser);
  }
});

const resendOTPById = async (id) => {
  const otp = Date.now().toString().slice(-6);
  const user = await UsersInfo.findByIdAndUpdate(id, {
    forgetPasswordToken: otp,
  });
  await mailService.forgotPasswordThroughNodeMailer({
    mail: user.email,
    forgetPasswordToken: otp,
  });
};

router.post("/updatePassword", async (req, res) => {
  console.log(req.body);
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(req.body.password, salt);
  const user = await UsersInfo.findByIdAndUpdate(req.body.id, {
    password: hash,
    status: true,
  });
  if (!user) {
    res.status(400).send({ message: "something went wrong" });
  } else {
    res.status(200).send({ message: "Password change sucessfully" });
  }
});
module.exports = router;
