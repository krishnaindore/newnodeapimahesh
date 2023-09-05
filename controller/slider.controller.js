const sliderModel = require('../model/slider.model')

exports.add = async (req, res) => {

     console.log(req.file);
     if (!req.file)
          return res.json({
               status: false,
               message: `please select image`,
          });

     const displayPhoto = req.file.filename;
     console.log(displayPhoto);
     await new sliderModel({

          image_url: displayPhoto,

     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `slider added successfully`,
                    data: success,
               });
          })
          .catch((error) => {
               return res.json({
                    status: false,
                    message: `error`,
                    error,
               });
          });
};
exports.update = async (req, res) => {
     const { id } = req.body;

     if (!id)
          return res.json({
               status: false,
               message: `please  provide id`,
          });
     if (!req.file)
          return res.json({
               status: false,
               message: `please select image`,
          });
     const displayPhoto = req.file.filename;
     await sliderModel.findByIdAndUpdate({
          _id: id,
          image_url: displayPhoto
     })

          .then((success) => {
               return res.json({
                    status: true,
                    message: "slider updated successfully",
                    // data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: false,
                    message: "something went wrong",
                    // data: error
               })
          })
}
exports.getAll = async (req, res) => {
     await sliderModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all sliders",
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
     const { id } = req.body

     await sliderModel.findOneAndDelete({ _id: id })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "sliders deleted",
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