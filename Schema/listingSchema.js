const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        image: Joi.string().allow("", null),
        category: Joi.string().valid("rooms", "iconiccities", "historicalhomes", "mountains", "catles", "pools", "camping", "farm")
    }).required()
});

module.exports = listingSchema;