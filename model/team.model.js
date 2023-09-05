const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
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


var teamModel = mongoose.model('team', teamSchema);
module.exports = teamModel;