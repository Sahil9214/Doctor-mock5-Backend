const { UserModal } = require("../Modal/User.modal");
const express = require("express");
const userRouter = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, confirm } = req.body;

  try {
    if (
      email.length === "" ||
      password.length === "" ||
      confirm.length === ""
    ) {
      res.status(400).send({ msg: "please Fill all crenditials" });
    } else {
      const ifAvailabel = UserModal.findOne({ email });
      if (ifAvailabel.length > 0) {
        res.status(200).send({ msg: "User Already Register" });
      } else if (password !== confirm) {
        res.status(400).send({ msg: "password not matched" });
      } else {
        bycrypt.hash(password, 4, async (err, hash) => {
          const User = new UserModal({
            email,
            password: hash,
            confirm,
          });
          await User.save();
        });
        res.status(200).send({ msg: "Register Successfull" });
      }
    }
  } catch (err) {
    res.status(400).send({ msg: "Something error" });
  }
});

//login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const User = await UserModal.findOne({ email });

    bycrypt.compare(password, User.password, (err, result) => {
      if (result === true) {
        const token = jwt.sign({ authorID: User._id }, "mock5");
        console.log("token", token);
        res.status(200).send({ msg: "Successfully get Token", token: token });
      } else {
        res.status(400).send({ msg: "wrong password" });
      }
    });
  } catch (err) {
    res.status(400).send({ msg: "Login Failed" });
  }
});

module.exports = { userRouter };
