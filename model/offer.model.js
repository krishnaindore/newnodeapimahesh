const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
     title: {
          type: String,
     },
     logo: {
          type: String,
     },
     des: {
          type: String
     }
})


var offerModel = mongoose.model('offer', offerSchema);
module.exports = offerModel;