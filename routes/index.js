
const routes = require('express').Router();
const email = require('../controllers/index');


routes.use('/api/email', email);
module.exports = routes;