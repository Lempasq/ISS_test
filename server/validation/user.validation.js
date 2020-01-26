const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(64)
            .trim()
            .required(),
        email: Joi.string()
            .min(1)
            .max(254)
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .trim()
            .required()
    });
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(1)
            .max(254)
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .trim()
            .required()
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
