const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
  try {
    const userObj = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const newUser = await User.create(userObj);
    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET);
    console.log(token);
    res.send({ newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ error: error.code });
  }
};

exports.tokenLogin = async (req, res) => {
  const token = await jwt.sign({ id: req.user._id }, process.env.SECRET);
  res.send({ user: req.user, token });
};