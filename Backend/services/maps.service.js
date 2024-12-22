const axios = require("axios");
const captainModel = require("../models/captain.model");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  // geocode api used for getting co-ordinates

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
//   distance matrix api used for getting distance and time
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      } else {
        return response.data.rows[0].elements[0];
      }
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    // place autocomplete api used for getting suggestions
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error("Unable to fetch suggestions");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}