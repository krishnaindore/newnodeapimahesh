const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema({
     image_url: {}
})


var sliderModel = mongoose.model('sliderModel', sliderSchema);
module.exports = sliderModel;