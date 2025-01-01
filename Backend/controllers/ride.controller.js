const rideService = require("../services/ride.service");
const {validationResult} = require("express-validator");
const mapService = require("../services/maps.service");
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {userId, pickup, destination, vehicleType} = req.body;
    try {
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
         res.status(201).json(ride);
         const pickupCoordinates=await mapService.getAddressCoordinate(pickup);
         const captainsInRadius=await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2);
         ride.otp="";
         const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        //  ride me user id ko replace krna h user document se
        //  otp captain ko send nhi krna h
        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,
                {event:"new-ride",data:rideWithUser});
        })
        
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {pickup, destination} = req.query;
    try {
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
        
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }
}


module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log("hellog kya haaal")
      return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    console.log(rideId);
    try {
        const ride=await rideService.confirmRide({rideId,captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{event:"ride-confirmed",data:ride});
        return res.status(200).json(ride);
        
    } catch (error) {
        return res.status(500).json({error:error.message});
        
    }

}    

