const { default: mongoose } = require('mongoose');
const teamModel = require('../model/team.model')

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
     await new teamModel({
          title: title,
          logo: displayPhoto,
          des: des,
     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `team added successfully`,
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
     await teamModel.findByIdAndUpdate(
          { _id: id, }
          ,
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
                    message: "team updated successfully",
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
     await teamModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all teams",
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

     await teamModel.findByIdAndDelete({ _id: mongoose.Types.ObjectId(id) })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "team deleted successfully",
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