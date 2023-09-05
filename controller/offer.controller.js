const { default: mongoose } = require('mongoose');
const offerModel = require('../model/offer.model')

exports.add = async (req, res) => {

     const { title, des, } = req.body;


     console.log(req.file);
     if (!req.file)
          return res.json({
               status: false,
               message: `please select image`,
          });

     const displayPhoto = req.file.filename;
     console.log(displayPhoto);
     await new offerModel({
          title: title,
          logo: displayPhoto,
          des: des,
     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `offer added successfully`,
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
     const { title, des } = req.body;

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
     await offerModel.findOneAndUpdate(

          { _id: id, },
          {
               $set: {

                    title: title,
                    logo: displayPhoto,
                    des: des,
               }
          }
     )

          .then((success) => {
               return res.json({
                    status: true,
                    message: "offer updated successfully",
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
     await offerModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all offers",
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

     await offerModel.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "offer deleted successfully",
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