const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [4, "your first should be atleast 4 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Lastname must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color should be atleast 3 characters"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate should be atleast 4 characters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "capacity should be atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto' ],
      // isko dekhte h 
      // kon kon se type
    },
  },
  location: {
    ltd: {
      type: Number,
      // lattitude
    },
    lng: {
      type: Number,
      // longitude
    },
  },
});
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("captain", captainSchema);
module.exports = captainModel;