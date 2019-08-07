
const express = require('express');
const router = express.Router();
const service = require('../service/user.service');

router.post('/send-registration-email',  async (req, res, next) => {

    var doc = req.body;
	console.log(doc);
    try {
        res.json(await service.sendRegistrationEmail(doc));
        
    }
    catch (err) {
        console.log(err)
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})


router.post('/send-password-change-email',  async (req, res, next) => {

    var doc = req.body;

    try {
        res.json(await service.sendChangePasswordEmail(doc));  
    }
    catch (err) {
        console.log(err)
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})

router.post('/send-forgot-password-link-email',  async (req, res, next) => {

    var doc = req.body;

    try {
        res.json(await service.sendForgotPasswordLinkEmail(doc));  
    }
    catch (err) {
        console.log(err)
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})


router.post('/send-email-verification-link',  async (req, res, next) => {

    var doc = req.body;

    try {
        res.json(await service.sendEmailVerificationLinkEmail(doc));  
    }
    catch (err) {
        console.log(err)
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})

//--------------------------------Amigo School-----------------------------------//

router.post('/send_email_parent',  async (req, res, next) => {

    var doc = req.body;

    try {
        res.json(await service.sendEmailParent(doc));  
    }
    catch (err) {
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})

router.post('/send_parent_activate_code',  async (req, res, next) => {

    var doc = req.body;

    try {
        res.json(await service.sendEmailVerificationActivateCodeEmail(doc));  
    }
    catch (err) {
        if (err.error)
            res.status(err.error.code).send(err.error);
        else
            res.status(500).send(err);
    }

})

module.exports = router
