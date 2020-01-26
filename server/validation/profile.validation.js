const Joi = require('@hapi/joi');

const profileValidation = (data) => {
    const schema = Joi.object({
        website: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        location: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        bio: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        githubusername: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        youtube: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        facebook: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        twitter: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        instagram: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        linkedin: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        company: Joi.string()
            .min(2)
            .max(64)
            .trim(),
        status: Joi.string()
            .min(2)
            .max(64)
            .trim()
            .required(),
        skills: Joi.string()
            .min(2)
            .max(1024)
            .trim()
            .required()
    });
    return schema.validate(data)
}

module.exports.profileValidation = profileValidation;