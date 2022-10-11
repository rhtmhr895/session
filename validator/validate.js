const joi = require('joi');

const validation = joi.object({
    name:joi.string().max(30).required(),
    email:joi.string().email().trim(true).required(),
    phone:joi.string().min(10).max(12).pattern(/[6-9]{1}[0-9]{9}/).required(),
    password:joi.string().min(5).max(15).trim(true).required()
})

module.exports = validation;