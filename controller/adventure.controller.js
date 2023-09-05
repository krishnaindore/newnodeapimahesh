const adventureModel = require('../model/adventure.model')

exports.add = async (req, res) => {

     const { location_name, location_url, } = req.body;

     if (!location_name)
          return res.json({
               status: false,
               message: `please location_name`,
          });
     console.log(req.file);
     if (!req.file)
          return res.json({
               status: false,
               message: `please select image`,
          });

     const displayPhoto = req.file.filename;
     console.log(displayPhoto);
     await new adventureModel({
          location_name: location_name,
          image_url: displayPhoto,
          location_url: location_url,
     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `adventure added successfully`,
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
exports.getAll = async (req, res) => {
     await adventureModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all adventure",
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
     const { id } = req.body;

     if (!id)
          return res.json({
               status: false,
               message: `please provide adventure id`,
          });
     await adventureModel.findOneAndDelete({
          _id: id
     })
          .then((success) => {
               return res.json({
                    status: true,
                    message: "adventure deleted successfully",
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