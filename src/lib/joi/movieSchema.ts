import Joi from 'joi';

export const addMovieSchema = Joi.object({
    title: Joi.string().min(1).required(),
    year: Joi.number().min(4).max(4).required(),
    type: Joi.string().valid('VHS', 'DVD', 'Blu-Ray').required(),
    people: Joi.array().required(),
});

export const addPersonSchema = Joi.object({
    full_name: Joi.string().min(1).required(),
});
