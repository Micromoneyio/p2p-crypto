import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";

const Joi = require('joi');

const createTransactionParams = {
    from: Joi.string().min(15).required(),
    fromPrivateKey: Joi.string().min(15).required(),
    to: Joi.string().min(15).required(),
};

const schema = Joi.object().keys(createTransactionParams);

export function validateCreateTransactionParams(model: CreateTransactionParams) {
    let result = Joi.validate(model, schema);
    if (!result.error)
        throw new ValidationError(result.error);
}


export function validateTransactionHash(hash) {
    let result = Joi.validate(hash, Joi.string().min(15).required());
    if (!result.error)
        throw new ValidationError(result.error);
}