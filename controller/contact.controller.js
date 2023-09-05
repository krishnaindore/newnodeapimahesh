const contactModel = require('../model/contact.model')

exports.add = async (req, res) => {

     const { phone, whatsapp, email } = req.body;


     await new contactModel({
          phone: phone,
          whatsapp: whatsapp,
          email: email,
     })
          .save()
          .then(async (success) => {
               return res.json({
                    status: true,
                    message: `contact added successfully`,
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
     console.log("31" ,req.body)
     const { phone, whatsapp, email } = req.body;
     await contactModel.findOneAndUpdate(
          {_id: id},{$set:{
               phone: phone,
               whatsapp: whatsapp,
               email: email
         } }).then((success) => {
          console.log('38updated')
          return res.json({
               status: true,
               message: "contact updated",
               // data: success
          })
     })
          .catch((error) => {
               console.log('46updated')
               return res.json({
                    status: true,
                    message: "something went wrong",
                    data: error
               })
          })
}
exports.getAll = async (req, res) => {
     await contactModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all contact",
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