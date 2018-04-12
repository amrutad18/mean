var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
//var sensorData = require('./sensorData')

//var sensorDataSchema = mongoose.model('SensorData').schema;
//Schema for sensor
var complaint = mongoose.Schema({
     user_id : String,
     complaint_id   : { type: String, unique: true },
     bill_no     :String,
     description : String,
     time : {type: Date, default: Date.now},
     device_type : String,
     device_no    : String,
     date   : String,
     number : Number,
     address : String,
     status       : {type: Boolean, default: false}
},
{
  collection:'complaint',
  safe:true
});

module.exports = mongoose.model('complaint', complaint);
