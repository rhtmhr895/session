const joi = require('joi');

const validation = joi.object({
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(5).max(15).trim(true).required()
})

module.exports = validation;