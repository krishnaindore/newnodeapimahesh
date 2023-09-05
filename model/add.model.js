const mongoose = require('mongoose')

const addSchema = new mongoose.Schema({
     name: {
          type: String,
     },
     url: {
          type: String,
          default: ''
     },
     image_url: {
          type: String,
          default: ''
     }
})


var addModel = mongoose.model('addModel', addSchema);
module.exports = addModel;