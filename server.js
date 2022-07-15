const express = require("express");
const app = express();
const mongoose = require("mongoose")
const cors = require('cors');
const path = require("path");
const expressValidator = require("express-validator")
const bodyParser = require("body-parser")

const connectDB = require("./db/connectDb");
const routes = require("./routes/routeIndex");
const MobileValidator = require('./utility/phone_number/phone_validations.js');
const { SERVER_PORT } = require("./utility/configs");

connectDB();

// api endpoints ---------
app.use(cors());

// create application/json parser
app.use(bodyParser.json({ limit: '50mb' }))
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))

/*  ******************************** APP VALIDATORS ************************************/
app.use(
    expressValidator({
      customValidators: {
        isValidCountryCode: function (c_code) {
          return MobileValidator.checkCountryCode(c_code)
        },
        // validateToken: function (value) {
        //   return tokenValidator(value)
        // },
        isValidDeviceToken: function (value) {
          if (!value) return false
          if (typeof value != 'string') return false
          if (value.length < 32) return false
          return true
        },
        isValidMongoId: function (value) {
          var regex = /^[0-9a-f]{24}$/
          return regex.test(value)
        },
        // isValidRole: function (value) {
        //   if (!value) return false
        //   if (_.values(constants.ROLE).indexOf(Number(value)) == -1) return false
        //   return true
        // },
        isValidEmail: function (value) {
          if (!value) return false
          var value = value.trim()
          let arr = value.split('.')
          let last = arr[arr.length - 1]
          if (last.length > 3) {
            return false
          }
          var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          return email_regex.test(value)
        },
        // isValidClass: function (value) {
        //   if (_.values(constants.CLASSES).indexOf(Number(value)) == -1)
        //     return false
        //   return true
        // },
        // isValidURL: function (value) {
        //   return constants.VALID_URL_REGEX.test(value)
        // },
        // isValidGroupCode: function (value) {
        //   if (value) {
        //     value = value.toString()
        //     if (value.length != configs.G_CODE_LENGTH) return false
        //     return true
        //   } else {
        //     return false
        //   }
        // },
        isValidBooleanString: function (value) {
          if (!(value == 'true' || value == 'false')) return false
          return true
        },
        // isValidMediaType: function (value) {
        //   var type = value.split('/')[0].toUpperCase()
        //   var format = value.split('/')[1].toLowerCase()
        //   if (_.keys(constants.VALID_MEDIA_TYPE).indexOf(type) == -1) return false
        //   if (_.property(type)(constants.VALID_MEDIA_TYPE).indexOf(format) == -1)
        //     return false
        //   return true
        // },
        // isValidImageSize: function (value) {
        //   if (Number(value) > configs.VALID_IMAGE_SIZE) return false
        //   return true
        // },
        // isValidClient: function (value) {
        //   if (!value) return false
        //   return (
        //     value == AppClients.MOBILE ||
        //     value == AppClients.WEB ||
        //     value == AppClients.ANDROID ||
        //     value == AppClients.IOS ||
        //     value == AppClients.WINDOWS
        //   )
        // },
        // isValidVersion: function (value) {
        //   var components = value.split('.')
        //   if (components.length < 2 || components.length > 3) return false
        //   for (var i = 0; i < components.length; i++) {
        //     if (isNaN(components[i])) return false
        //     if (parseInt(components[i]) < 0) return false
        //   }
        //   return true
        // },
        isValidIndianMobileNum: function (p_no, c_code) {
          return MobileValidator.checkIndian(p_no, c_code)
        },
        isValidMobileNum: function (p_no, c_code) {
          return MobileValidator.checkGeneric(p_no, c_code)
        },
        // validateAccountType: function (value) {
        //   return (
        //     value == AccountData.TYPE.IOS ||
        //     value == AccountData.TYPE.ANDROID ||
        //     value == AccountData.TYPE.WEB ||
        //     value == AccountData.TYPE.WINDOWS
        //   )
        // },
        isValidTokenSecretKey: function (value) {
          if (!value) return false
          if (value.length < 24) return false
          return true
        },
        isValidDeviceId: function (value) {
          if (!value) return false
          if (value.length < 16) return false
          return true
        },
        // isValidIPP: function (value) {
        //   if (!value) return false
        //   if (isNaN(value)) return false
        //   if (value > configs.MESSAGE_LOAD_IPP_LIMIT) return false
        //   return true
        // },
        // isValidRcmdIPP: function (value) {
        //   if (!value) return false
        //   if (isNaN(value)) return false
        //   if (value > configs.RECOMMENDATION_GROUPS_LENGTH_LIMIT) return false
        //   return true
        // },
        // isValidTokenClient: function (value) {
        //   if (!value) return false
        //   return (
        //     value == AppClients.WEB ||
        //     value == AppClients.ANDROID ||
        //     value == AppClients.IOS ||
        //     value == AppClients.WINDOWS
        //   )
        // },
        // validateDeviceType: function (value) {
        //   if (!value) return false
        //   return (
        //     value == AppClients.WEB ||
        //     value == AppClients.ANDROID ||
        //     value == AppClients.IOS ||
        //     value == AppClients.WINDOWS
        //   )
        // },
        // isValidGroupType: function (value) {
        //   if (!value) return false
        //   if (parseInt(value) == 1 || parseInt(value) == 0) return true
        //   return false
        // },
        // isValidPrev: function (value) {
        //   if (!value) return false
        //   if (isNaN(value)) return false
        //   if (value > configs.MESSAGE_LOAD_PREV_LIMIT) return false
        //   return true
        // },
        // isValidAccessToken: function (value) {
        //   if (!value) return false
        //   if (typeof value !== 'string') return false
        //   return true
        // },
        // isValidRefreshToken: function (value) {
        //   if (!value) return false
        //   if (typeof value !== 'string') return false
        //   return true
        // },
        // isValidLength: (string) => {
        //   if (string.length > configs.MAX_NAME_LENGTH) {
        //     return false
        //   }
        //   return true
        // },
        // isValidEmailLength: (string) => {
        //   let [local, domain, ...rest] = string.split('@')
        //   if (
        //     local.length > configs.MAX_EMAIL_LOCAL_LENGTH ||
        //     domain.length > configs.MAX_EMAIL_DOMAIN_LENGTH
        //   ) {
        //     return false
        //   }
        //   return true
        // },
      },
    })
  )
  /*  **********************************************************************************    */

app.use('/api', routes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, './app/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.join(_dirname, './app', 'build', 'index.html'))
//     })
// } else {
app.get("*", (req, res) => {
    res.send("Are you lost my friend??")  
})
// }

// listening to port and starting the server ----------
app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}!`)
})