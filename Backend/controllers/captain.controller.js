const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const blackListModeltoken = require("../models/blacklistToken.model");
const captainService = require("../services/captain.service");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  // debugging
  // console.log(req.body);

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  // password ka jaroorat hoga
  if (!captain) {
    console.log("email not found");
    return res.status(401).json({ message: " email or password not valid" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    console.log("password not found");
    return res.status(401).json({ message: " email or password not valid" });
  }
  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(201).json({ token, captain });
};

module,exports.getProfileCaptain=async(req,res,next)=>{
  res.status(201).json(req.captain);
}  

module.exports.logoutCaptain=async(req,res,next)=>{
  res.clearCookie('token');
  const token=req.cookies.token || req.headers.authorization.split(' ')[1];
  await blackListModeltoken.create({token});
  res.status(201).json({message:'logout success'});

}

