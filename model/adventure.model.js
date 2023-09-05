const mongoose = require('mongoose')

const adventureSchema = new mongoose.Schema({
     location_name: {
          type: String,
     },
     location_url: {
          type: String,
          default: ''
     },
     image_url: {
          type: String,
          default: ''
     }
})


var adventureModel = mongoose.model('adventureModel', adventureSchema);
module.exports = adventureModel;