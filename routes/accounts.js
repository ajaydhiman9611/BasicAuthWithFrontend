const express = require('express');
const app = express.Router();
const errorCodes = require('../utility/errors.js')
const {sendError, sendSuccess} = require('../utility/helpers')
const constants = require('../utility/constants');
const { account_email_save_error } = require('../utility/errors.js');
const mongoose = require('mongoose');
const PasswordUtils = require('../utility/password_utils');
const Password = require('../models/Passwords.js');
const AuthModule = require("../utility/auth/auth_token")
require('../models/Accounts')
const Account = mongoose.model('Accounts');

app.get("/checkAuth", function(req, res){
    console.log("Checking auth")
    res.send(req.params)
})

app.post('/register_w', (req, res)=>{
  console.log("\n\n------------------- Called '/register_w' --------------------\n\n")
  
  saveUser(req,res).catch(err => {
    return sendError(res, err, 'server_error', 400)
  })
})

app.post('/login', (req, res)=>{
  console.log("\n\n------------------- Called '/login' --------------------\n\n")
  
  login(req, res).catch(err => {
    return sendError(res, err, 'server_error', 400)
  })
})

async function login(req, res){
  let email = req.body.email.trim()
  let phone = req.body.phone.trim()
  let pass = req.body.pass.trim()

  if((!email || !phone) && !pass){
    return sendError(res, 'Invalid Parameters', 'invalid_parameters', constants.HTTP_STATUS.BAD_REQUEST)
  }

  let account = await Account.findOne({ $or: [{email}, {phone}]})
  if(!account){
    return sendError(res, "Account Does not exist", 'server_error', constants.HTTP_STATUS.BAD_REQUEST)
  }
  console.log({account})
  
  let pwd_obj = await Password.findOne({ aid: account._id, act: true }).lean()
  console.log({pwd_obj})
  var passwordIsValid = PasswordUtils.comparePassword(
    pass,
    pwd_obj.pwd
  )
  if(!passwordIsValid){
    return sendError(res, 'Wrong Password', 'pwd_error', constants.HTTP_STATUS.BAD_REQUEST)
  }

  var access_token = AuthModule.getAT({ id: account._id, cl: "W" }, "W")
  return sendSuccess(res, {at: access_token, aid: account._id})

}


// Middleware for authentication -----------------------------------------------------------
app.use(function(req, res, next) {
  let at = req.headers.authentication || req.body.at
  if(!at){
    return sendError(res, 'Authentication Required', "authentication_error", 403)
  }
  next()
})

app.get('/gt_usr', (req, res) => {
  console.log("\n\n------------------- Called /gt_usr --------------------\n\n");
  getUser(req, res).catch(err => {
    console.log(err);
    return sendError(res, err, constants.HTTP_STATUS.BAD_REQUEST)
  })
})

const getUser = async function(req, res){
  console.log(req.headers.authentication)
  let account = await Account.findById()
  return sendSuccess(res, {msg: "You were here!"})
}
// app.post("/createPassword", (req, res) => {
//   console.log("\n\n ------------ Called /createPassword -------------- \n\n")
//   savePass(req,res).catch(err => sendError(res, err, 'server_error', 400))
// })
// async function savePass(req, res) {
//   let pwd = req.body.pass ? PasswordUtils.createPassword(req.body.pass) : undefined;
//   let password = new Password({
//     aid: mongoose.Types.ObjectId("62cef083a836e2c9bd03703f"),
//     pwd,
//   })
//   await password.save()
//   return sendSuccess(res, {msg: "Password for "+password.aid+" saved successfully!"})
// }

async function saveUser(req, res) {
  console.log("\n\n------------------- ", req.body)

  if(!req.body.email.trim() || !req.body.pass.trim() || !req.body.phone.trim() || !req.body.ccod.trim() || !req.body.name.trim()){
    return sendError(res, "Parameters missing", "invalid_parameters", 400)
  }

  let alreadyExistCheck = await Account.find({$or: [{email: req.body.email.trim()}, {phone: req.body.phone.trim()}]})
  if(alreadyExistCheck){
    return sendError(res, "User already Exists", "email_already_exist", 400)
  }

  // Create and save account
  let account_obj = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    phone: req.body.phone.trim(),
    ccod: req.body.ccod.trim() || 91, // default is 91.
  }
  let newUser = new Account(account_obj)
  let {_id} = await newUser.save();

  
  // Create and save password
  let password_obj = {
    pwd: req.body.pass.trim() ? PasswordUtils.createPassword(req.body.pass.trim()): undefined,
    aid: _id
  } 
  let password = new Password(password_obj)
  await password.save()
  console.log("SUCCESS: User saved Successfully!\n")
  return sendSuccess(res, {msg: "User saved successfully!"})
}

module.exports = app;