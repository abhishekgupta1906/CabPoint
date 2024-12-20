const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListModeltoken=require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {fullname, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname:fullname.firstname ,
    lastname:fullname.lastname ,
    email,
    password: hashedPassword,
  });
 
  const token=user.generateAuthToken();
  res.status(200).json({token,user});
//   is pr thora error a skta h
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  
  const user = await userModel.findOne({ email }).select('+password');

  // password ka jaroorat hoga
  if(!user){
    console.log('email not found');
      return res.status(401).json({message:' email or password not valid'});

  }
  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    console.log('password not found');
    return res.status(401).json({message:' email or password not valid'});
  }
  const token=user.generateAuthToken();

  res.cookie('token', token);
  
  res.status(200).json({token,user});

}  
module,exports.getProfileUser=async(req,res,next)=>{
  res.status(200).json(req.user);
}  

module.exports.logoutUser=async(req,res,next)=>{
  res.clearCookie('token');
  const token=req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListModeltoken.create({token});
  res.status(200).json({message:'logout success'});

}
