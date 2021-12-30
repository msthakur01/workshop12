const User = require("../model/userModel");
const generateWebToken = require("../util/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.fullname,
      email: user.email,
      role:user.role,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
};

const users = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const user = await User.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
  if (user) {
    res.json({
      users: user.length,
      user,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Request");
  }
};


const usersSelection = async (req, res) => {
    
    const user = await User.find({},{email:1})
    if (user) {
      res.json({
        users: user.length,
        user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Request");
    }
  };


const userSearch  = async (req, res) => {
    const regex = new RegExp(req.params.name,'i');
    const regexemail = new RegExp(req.params.email,'i')
  
    const user = await User.find({name:regex, email:regexemail})
    if (user) {
      res.json({
        users: user.length,
        user,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Request");
    }
  };

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateWebToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email and Password");
  }
};

module.exports = { registerUser, loginUser, users, userSearch,usersSelection };
