const dotenv=require('dotenv');
require('dotenv').config();
const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}


module.exports = connectToDb;
