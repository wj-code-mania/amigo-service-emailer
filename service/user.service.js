const constants = require('../app-constants').APP_CONSTANTS;
const fs = require('fs');
const emailService = require('../service/email.service');
const utils = require('./utils');


var commanContent = fs.readFileSync('email-templates/comman.html', "utf-8");
var registrationContent = fs.readFileSync('email-templates/registration.html', 'utf-8');
var changePasswordContent = fs.readFileSync('email-templates/change-password.html', 'utf-8');
var forgotPasswordContent = fs.readFileSync('email-templates/forgot-password-reset-link.html', 'utf-8');
var emailVerificationContent = fs.readFileSync('email-templates/email-verification-link.html', 'utf-8');
var emailVerificationActivateCodeContent = fs.readFileSync('email-templates/activate-code.html', 'utf-8');

exports.sendRegistrationEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            var registrationContentCopy = registrationContent;
            var commanContentCopy = commanContent;

            registrationContentCopy = registrationContentCopy.replace('[FIRSTNAME]', doc.firstName);
            registrationContentCopy = registrationContentCopy.replace('[LASTNAME]', doc.lastName);
            registrationContentCopy = registrationContentCopy.replace('[EMAIL]', doc.email);
            registrationContentCopy = registrationContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);

            commanContentCopy = commanContentCopy.replace('{{{data}}}', registrationContentCopy);
            commanContentCopy = commanContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);

            doc.emailBody = commanContentCopy;
            doc.to = doc.email;
            doc.subject = constants.REGISTRATION_SUBJECT;

            var result = await emailService.addEmail(doc);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}

exports.sendChangePasswordEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(changePasswordContent);
            var changePasswordContentCopy = changePasswordContent;
            var commanContentCopy = commanContent;

            changePasswordContentCopy = changePasswordContentCopy.replace('[FIRSTNAME]', doc.firstName);
            changePasswordContentCopy = changePasswordContentCopy.replace('[LASTNAME]', doc.lastName);
            changePasswordContentCopy = changePasswordContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);


            commanContentCopy = commanContentCopy.replace('{{{data}}}', changePasswordContentCopy);
            commanContentCopy = commanContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);

            doc.emailBody = commanContentCopy;
            doc.to = doc.email;
            doc.subject = constants.PASSWORD_CHANGE;

            var result = await emailService.addEmail(doc);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}


exports.sendForgotPasswordLinkEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            console.log(changePasswordContent);
            var forgotPasswordContentCopy = forgotPasswordContent;
            var commanContentCopy = commanContent;
            var link = constants.FORGOTPASSWORDLINK + '?data=' + doc.securityKey;

            forgotPasswordContentCopy = forgotPasswordContentCopy.replace('[FIRSTNAME]', doc.firstName);
            forgotPasswordContentCopy = forgotPasswordContentCopy.replace('[LASTNAME]', doc.lastName);
            forgotPasswordContentCopy = forgotPasswordContentCopy.replace('[LINK]', link);
            forgotPasswordContentCopy = forgotPasswordContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);


            commanContentCopy = commanContentCopy.replace('{{{data}}}', forgotPasswordContentCopy);
            commanContentCopy = commanContentCopy.replace('{{{phone}}}', constants.FLEWBER_PHONE);

            doc.emailBody = commanContentCopy;
            doc.to = doc.email;
            doc.subject = constants.FORGOT_PASSWORD;

            var result = await emailService.addEmail(doc);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}


exports.sendEmailVerificationLinkEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            var emailVerificationContentCopy = emailVerificationContent;
            var commanContentCopy = commanContent;
            var link = constants.FORGOTPASSWORDLINK + '?data=' + doc.securityKey;

            emailVerificationContentCopy = emailVerificationContentCopy.replace('[FIRSTNAME]', doc.firstName);
            emailVerificationContentCopy = emailVerificationContentCopy.replace('[LASTNAME]', doc.lastName);
            emailVerificationContentCopy = emailVerificationContentCopy.replace('[LINK]', link);
            emailVerificationContentCopy = emailVerificationContentCopy.replace('{{{phone}}}', constants.REMAX_PHONE);


            commanContentCopy = commanContentCopy.replace('{{{data}}}', emailVerificationContentCopy);
            commanContentCopy = commanContentCopy.replace('{{{phone}}}', constants.REMAX_PHONE);

            doc.emailBody = commanContentCopy;
            doc.to = doc.email;
            doc.subject = constants.EMAIL_VERIFICATION;

            var result = await emailService.addEmail(doc);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}

exports.sendEmailVerificationActivateCodeEmail = function (doc) {
    return new Promise(async function (resolve, reject) {
        try {
            var emailVerificationActivateCodeContentCopy = emailVerificationActivateCodeContent;
            var commanContentCopy = commanContent;

            emailVerificationActivateCodeContentCopy = emailVerificationActivateCodeContentCopy.replace('[FIRSTNAME]', doc.firstName);
            emailVerificationActivateCodeContentCopy = emailVerificationActivateCodeContentCopy.replace('[LASTNAME]', doc.lastName);
            emailVerificationActivateCodeContentCopy = emailVerificationActivateCodeContentCopy.replace('[activateCode]', '[ '+doc.activateCode + ' ]');
            emailVerificationActivateCodeContentCopy = emailVerificationActivateCodeContentCopy.replace('{{{phone}}}', constants.REMAX_PHONE);

            commanContentCopy = commanContentCopy.replace('{{{data}}}', emailVerificationActivateCodeContentCopy);
            commanContentCopy = commanContentCopy.replace('{{{phone}}}', constants.REMAX_PHONE);

            doc.emailBody = commanContentCopy;
            doc.to = doc.email;
            doc.subject = constants.EMAIL_VERIFICATION_ACTIVATE_CODE;

            var result = await emailService.addEmail(doc);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}

exports.sendEmailParent = function (body) {
    return new Promise(async function (resolve, reject) {
        try {
            var email_data = body.email_data;
            var email_list = body.email_list;
            var to = '';
            var count = 0;
            email_list.forEach(function(email){
                if(count == 0){
                    to += email;
                }else{
                    to += ', ' + email;
                }
                count++;
            })

            email_data.emailBody = email_data.content;
            email_data.to = to;
            email_data.subject = email_data.subject;  

            var result = await emailService.addEmail(email_data);

            resolve(utils.createResponse(null, null, constants.SUCCESS, constants.SUCCESSCODE, null));
        }
        catch (ex) {
            reject(ex);
        }
    })
}

