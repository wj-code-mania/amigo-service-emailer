var request = require('request');
const constants = require('../app-constants').APP_CONSTANTS;
var cfg = require('../config');
var CryptoJS = require("crypto-js");


exports.sendOTP = function (doc) {
    return new Promise(function (resolve, reject) {

        request.post(
            cfg.notify.url + cfg.notify.otp,
            doc,
            function (err, response, body) {
                if (err)
                    reject(constants.OTPERROR);
                resolve(response)
            }
        );

    })
}

exports.checkforAccessControl = function (token, role, resource, action) {
    return new Promise(function (resolve, reject) {

        request({
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
                'Role': role,
                'Resource': resource,
                'Action': action

            },
            uri: cfg.accesscontrol.url,
            method: 'GET'
        }, function (err, res, body) {
            if (err)
                reject(constants.OTPERROR);
            resolve(response)
        });

        /*request.get(
            cfg.notify.url + cfg.notify.otp,
            doc,
            function (err, response, body) {
                if (err)
                    reject(constants.OTPERROR);
                resolve(response)
            }
        );*/

    })
}

exports.createResponse = function (property, value, status, code, error) {
    var response = {};
    response.status = status;
    if (property)
        response[property] = value;
    else
        response[constants.RESPONSE] = null;
    if (error) {

        response.error = error;

    }
    else {
        response.error = {}
        response.error.code = code != null ? code : 0;
        response.error.message = null;

    }

    return response;
}

exports.createErrorResponse = function (code, message) {
    var err = {};
    err.status = constants.FAILED;
    err.response = null;
    err.error = {}
    err.error.code = code;
    err.error.message = message;
    return err;
}

exports.createDetailedErrorResponse = function (status, response, code, message) {
    var err = {};

    err.status = status;
    err.response = response;
    err.error = {}
    err.error.code = code;
    err.error.message = message;
    return err;
}


exports.getAggregateArray = function (aggregateObjects) {

    var aggregateArray = [];
    aggregateObjects.forEach(object => {

        switch (object.type) {
            case constants.MATCH:
                {
                    var criteria = {}
                    criteria[object.name] = object.value;
                    var obj = {};
                    obj[constants.MATCH] = criteria
                    aggregateArray.push(obj)

                    break;
                }
            case constants.GROUP: {
                var criteria = {}
                criteria._id = '$' + object.id;
                object.aggTypeAndOutputProps.forEach(obj => {
                    var accumulator = {};
                    accumulator[obj.aggType] = '$' + obj.name;
                    criteria[obj.outputProperty] = accumulator;
                })

                var obj = {};
                obj[constants.GROUP] = criteria
                aggregateArray.push(obj)

                break;
            }
            default:

        }
    });

    return aggregateArray;

}

exports.encrypt = function (strToBeEncrypted,key) {

    var b64 = CryptoJS.AES.encrypt(strToBeEncrypted, key?key:constants.SECRETKEY).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
   
    //return CryptoJS.AES.encrypt(strToBeEncrypted, key?key:constants.SECRETKEY).toString();

}

exports.decrypt = function (strToBeDecrypted,key) {

    var reb64 = CryptoJS.enc.Hex.parse(strToBeDecrypted);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, key?key:constants.SECRETKEY);
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
   
    /*var bytes  = CryptoJS.AES.decrypt(strToBeDecrypted, key?key:constants.SECRETKEY);
     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     return decryptedData;*/

}