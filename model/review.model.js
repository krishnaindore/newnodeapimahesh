const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
     userId: {
       type: mongoose.Types.ObjectId,
       required: true,
       ref: "users",
     },
     caption: {
       type: String,
       default: "",
     },
     date: {
       type: Date,
     },
     city: {
       type: String,
       default: "",
     },
     rating: {
       type: Number,
       default: 0,
     },
   
     img: {
       type: [String], // Changed the type to an array of strings
     },
   });
   


var reviewModel = mongoose.model('reviews', reviewSchema);
module.exports = reviewModel;