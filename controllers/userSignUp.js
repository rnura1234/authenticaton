const User = require('../models/userModel');

exports.userSignUp = async (req, res, next) => {
  try {
    
    const newUser = await User.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
