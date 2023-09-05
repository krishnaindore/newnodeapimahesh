const { default: mongoose } = require('mongoose');
const reviewModel = require('../model/review.model')

exports.add = async (req, res) => {

     const { userId, caption, rating, city, date } = req.body;
console.log("body:", req.body);
console.log("files:", req.files);

if (!req.files || req.files.length === 0) {
  return res.json({
    status: false,
    
    message: `Please select image(s)`,
  });
}

const displayPhotos = req.files.map((file) => file.filename);
console.log("displayPhotos:", displayPhotos);
   
const newReview = new reviewModel({
  userId,
  caption,
  rating,
  city,
  date,
  img: displayPhotos,
});

newReview.save()
  .then(() => {
    return res.json({
      status: true,
      message: `Review saved successfully`,
    });
  })
  .catch((error) => {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: `Error saving review`,
    });
  });

};
exports.getByCity = async (req, res) => {
     const { city } = req.params;
     await reviewModel.find({ city: city }).populate("userId")
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all reviews",
                    data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}
exports.getAll = async (req, res) => {
     await reviewModel.find().populate("userId")
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all reviews",
                    data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}
exports.delete = async (req, res) => {
     const { id } = req.params

     await reviewModel.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "review deleted successfully",
                    // data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}