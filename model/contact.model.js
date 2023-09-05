const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
     phone: {
          type: Number,
     },
     whatsapp: {
          type: Number,
     },
     email: {
          type: String
     }
})


var contactModel = mongoose.model('contact', contactSchema);
module.exports = contactModel;