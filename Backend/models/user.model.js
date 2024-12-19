const mongoose = require("mongoose");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [4, "your first should be atleast 4 characters"],
    },
    lastname: {
      type: String,
      
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength: [4, "your first should be atleast 4 characters"],
  },
  password:{
    type:String,
    required:true,
    select:false
    // iska mtlb jb bhi user ko find krnege password nhi jyega

  },
  socketId:{
    type:String,
    
  },
});
userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;

}  

userSchema.methods.comparePassword=async function(password){
   return await bcrypt.compare(password,this.password);

} 
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}


const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
