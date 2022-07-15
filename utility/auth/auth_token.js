const jwt = require('jsonwebtoken')
const configs = require('../configs')

exports.getAT = function (object_for_token, client="W") {
    var expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME
    switch (client) {
      case "M":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME
        break
      case "A":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME_ANDROID
        break
      case "I":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME_IOS
        break
      case "W":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME
        break
      case "W":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME_WEB
        break
      case "S":
        expiryTime = configs.JWT_ACCESS_TOKEN_EXPIRY_TIME_TEMP
        break
    }
    object_for_token.hcode = randomNumberOfLength(configs.RANDOM_NUMBER_LENGTH)
    return jwt.sign(object_for_token, configs.JWT_ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: expiryTime,
    })
  }

  function randomNumberOfLength(length) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    )
  }
  