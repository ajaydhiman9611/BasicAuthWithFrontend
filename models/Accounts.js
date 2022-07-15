const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AccountSchema =  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    ccod: {
      type: Number,
      required: true,
      default: "91"
    },
    phone: {
      type: Number,
      required: true
    },
    ep_vrfy: {
      type: Boolean
    },
    phn_vrfy:{
      type: Boolean
    }
  },
  { timestamps: true },
)

var Accounts = mongoose.model('Accounts', AccountSchema)