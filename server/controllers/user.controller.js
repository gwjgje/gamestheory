const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSignin = async (req, res) => {
     const { username, password } = req.body;
     try {
          const matchedUser = await UserModel.findOne({ username });
          if (matchedUser) {
               bcrypt.compare(password, matchedUser._doc.password, function (err, result) {
                    if (result) {
                         const token = jwt.sign({
                              userId: matchedUser._doc._id,
                         }, process.env.SECRET_KEY, { expiresIn: '24h' });
                         res.status(200).send({ message: "Login successful", user: { id: matchedUser._doc._id, name: matchedUser._doc.username, token } });
                    } else {
                         res.status(400).send({ message: "Wrong Password!", error: err })
                    }
               });
          } else {
               res.status(404).send({ message: "User not found!" });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error.message
          });
     }
}


const userSignUp = async (req, res) => {
     const { username, password } = req.body;

     try {
          const matchedUsers = await UserModel.find({ username });
          if (matchedUsers.length) {
               res.status(200).send({
                    message: "User already exists!"
               });
          } else {
               bcrypt.hash(password, +process.env.SALT_ROUND, async function (err, hash) {
                    if (err) {
                         res.status(500).send({
                              message: "error in bcrypt"
                         });
                    } else {
                         try {
                              const user = new UserModel({ username, password: hash });
                              await user.save();

                              res.status(201).send({
                                   message: "Sign-up Sccessful"
                              })
                         } catch (error) {
                              console.log('error:', error)
                              res.status(400).send({
                                   message: error.message,
                                   error: error
                              });
                         }
                    }
               });
          }
     } catch (error) {
          res.status(500).send({
               message: "Internal server error!",
               error: error
          });
     }
}

module.exports = { userSignin, userSignUp };