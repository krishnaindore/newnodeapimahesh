const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({

     username: {
          type: String,
          default: ''
     },
     password: {
          type: String,
          default: ''
     },
     token: {
          type: String
     },

})


var adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;