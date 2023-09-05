const adminModel = require("../model/admin.model");
const jwtMiddleware = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
exports.create = async (req, res) => {
     let {
          username,
          password,
     } = req.body;

     let error_message = `please enter`;
     if (!username) {
          error_message += `username`;
     }
     if (!password) {
          error_message += `, password`;
     }

     if (error_message !== "please enter") {
          return res.json({
               success: false,
               message: error_message,
          });
     }

     const isadminFound = await adminModel.findOne({ username: username });
     if (isadminFound) {
          return res.json({
               success: false,
               message: "admin already exist please login",
          });
     }
     const hashed_password = await bcrypt.hash(password, 10);

     await new adminModel({
          username: username,
          password: hashed_password,
     })
          .save()
          .then(async (success) => {
               console.log("success ==>", success);

               const token = await jwtMiddleware.generate_token_admin(
                    success._id,
                    success.username
               );
               console.log(token);
               await adminModel
                    .findOneAndUpdate(
                         { _id: mongoose.Types.ObjectId(success._id) },
                         { $set: { token: token } },
                         { returnOriginal: false }
                    )
                    .then((success) => {
                         return res.json({
                              success: true,
                              message: `admin created`,
                              data: success,
                         });
                    })
                    .catch((error) => {
                         return res.json({
                              success: false,
                              message: "something went wrong",
                              error,
                         });
                    });
          })

};



exports.login = async (req, res) => {
     let { username, password } = req.body;

     let error_message = `please enter`;

     if (!username) {
          error_message += `, username`;
     }
     if (!password) {
          error_message += `, password`;
     }

     if (error_message !== "please enter") {
          return res.json({
               success: false,
               message: error_message,
          });
     }

     const isadminFound = await adminModel.findOne({ username: username });
     if (!isadminFound) {
          return res.json({
               success: false,
               message: "admin not registered please register",
          });
     }
     const token = await jwtMiddleware.generate_token_admin(
          isadminFound._id,
          isadminFound.username
     );
     let response = {
          username: isadminFound.username,
          password: isadminFound.password,
          token: token
     }
     if (bcrypt.compareSync(password, isadminFound.password)) {
          return res.json({
               success: true,
               message: `logged in`,
               data: response,
          });
     } else {
          return res.json({
               success: false,
               message: `incorrect password`,
          });
     }
};

exports.getAll = async (req, res) => {
     await adminModel.find()
          .then((success) => {
               return res.json({
                    status: true,
                    message: "all admin users",
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