const mongoose = require('mongoose')
const locationSchema = new mongoose.Schema({
     
     state: {
       type: String,
       default: "",
     },
     date: {
       type: Date,
     },
     caraImgLocation: {
       type: [String]
       
     },
     firstPara: {
        type: String,

        default: "",
     },
   secondPara: {
        type: String,
        default: "",

     },
     exactLocation:[{
     locationImg: {
        type: String,
        
        default: "",
     },
     locationType: {
        type: String,
        default: "popular place",

        enum: ["popular place" , "hill station" , "religious place" , "museum"],
     },
     locationTitle:{
      type: String ,
      default:''
   },
     locationDescription:{
        type: String ,
        default:''
     }
     }]
   });
   


var locationModel = mongoose.model('locations', locationSchema);
module.exports = locationModel;