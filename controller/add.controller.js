const { default: mongoose } = require('mongoose');
const addModel = require('../model/add.model')

exports.add = async (req, res) => {

     const { name, url, } = req.body;


     console.log(req.file);
     if (!req.file)
          return res.json({
               status: false,
               message: `please select image`,
          });

     const displayPhoto = req.file.filename;
     console.log(displayPhoto);
     await new addModel({
          name: name,
          image_url: displayPhoto,
          url: url,
     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `add added successfully`,
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
     const { name, url } = req.body;

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
     await addModel.findByIdAndUpdate(
          { _id: id, },
          {
               $set: {
                    name: name,
                    url: url,
                    image_url: displayPhoto
               }
          })

          .then((success) => {
               return res.json({
                    status: true,
                    message: "add updated successfully",
                    // data: success
               })
          })
          .catch((error) => {
               return res.json({
                    status: false,
                    message: "something went wrong",
                    data: error
               })
          })
}
exports.getAll = async (req, res) => {
     await addModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all add",
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

     await addModel.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "add deleted successfully",
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