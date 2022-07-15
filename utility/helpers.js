var constants = require('./constants.js')
var errorCodes = require('./errors.js')
const util = require('util')
const fs = require('fs')
const { promisify } = require('util')

module.exports = {
  sendError: function (res, err, error_index, status_code) {
    console.trace(err)

    if (typeof status_code == 'undefined') {
      status_code = constants.HTTP_STATUS.SERVER_ERROR
    }

    // res.set("KeepAlive", false);
    res.status(status_code).json({
      code: errorCodes[error_index][0],
      message: err,
      success: false,
    })
    return
  },
  sendErrorCustomMessage: function (res, message, code1, data, code2) {
    res.status(code1).json({
      code: code2,
      message,
      success: false,
      ...data,
    })
    return
  },
  sendSuccess: function (res, data) {
    // res.set("KeepAlive", false);
    res.status(constants.HTTP_STATUS.OK).json({
      success: true,
      data
    })
    return
  },
  // parseCsv: (path) => {
  //   return new Promise((resolve, reject) => {
  //     let results = []
  //     fs.createReadStream(path, { encoding: 'utf8' })
  //       .pipe(
  //         csv({
  //           mapHeaders: ({ header, index }) => header.trim(),
  //         })
  //       )
  //       .on('data', (data) => results.push(data))
  //       .on('end', () => {
  //         return resolve(results)
  //       })
  //   })
  // },
  isValidUrl: function (_string) {
    const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
    return matchPattern.test(_string)
  },
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
  // filterCourses: async function (courses, crs_pg_ids) {
  //   let arr = []
  //   arr = courses.filter((course) => {
  //     // console.log({ id: course._id })
  //     if (crs_pg_ids.indexOf('*') != -1) {
  //       // console.log('cond 2 \n user assigned all courses locations specified')
  //       return true
  //     } else if (crs_pg_ids.indexOf(course._id) != -1) {
  //       // console.log('cond 3 \n course is assigned to the user')
  //       return true
  //     } else {
  //       // console.log('cond 4')
  //       return false
  //     }
  //   })
  //   arr.forEach((el) => {
  //     console.log({ name: el.name })
  //   })
  //   return arr
  // },
  // filterBatches: async function (batches, cids, loc_ids) {
  //   let arr = []
  //   console.log({ cids, loc_ids })
  //   // console.log({ batches })
  //   arr = batches.filter((batch) => {
  //     // console.log({ loc_id: batch.loc_id, loc_ids })
  //     if (
  //       loc_ids.indexOf(['*']) == -1 &&
  //       batch.loc_id &&
  //       loc_ids.indexOf(batch.loc_id) == -1
  //     ) {
  //       console.log(
  //         'cond 1 \n user not assigned all locations and this batch is of different location'
  //       )
  //       return false
  //     } else {
  //       if (cids.indexOf('*') != -1) {
  //         // console.log('cond 2 \n user assigned all batchs locations specified')
  //         return true
  //       } else if (cids.indexOf(batch._id) != -1) {
  //         // console.log('cond 3 \n batch is assigned to the user')
  //         return true
  //       } else {
  //         // console.log('cond 4')
  //         return false
  //       }
  //     }
  //   })
  //   arr.forEach((el) => {
  //     console.log({ name: el.btch_name })
  //   })
  //   return arr
  // },
  // filterLocations: async function (locations, cids, loc_ids) {
  //   let arr = []
  //   arr = locations.filter((location) => {
  //     // console.log({ loc_id: location._id, loc_ids })
  //     if (loc_ids.indexOf(['*']) == -1 && loc_ids.indexOf(location._id) == -1) {
  //       // console.log(
  //       // 'cond 1 \n user not assigned all locations and this location is of different location'
  //       // )
  //       return false
  //     } else {
  //       return true
  //     }
  //   })
  //   arr.forEach((el) => {
  //     console.log({ name: el.name })
  //   })
  //   return arr
  // },
  isValidMongoId: function (value) {
    var regex = /^[0-9a-f]{24}$/
    return regex.test(value)
  },
  checkBoolean(value) {
    return typeof value == 'boolean'
  },
  serialiseSyncData: function (obj, HASH_KEY_INCLUDES) {
    let finalObj = {}
    HASH_KEY_INCLUDES.forEach((el) => {
      finalObj[el] = obj[el]
    })
    console.log(JSON.stringify(finalObj))
    return JSON.stringify(finalObj)
  },
  createSyncHash: function (string) {
    console.log({ string })
    return MD5(string).toString()
  },
}
