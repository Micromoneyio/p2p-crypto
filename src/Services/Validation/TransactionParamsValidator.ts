import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";

const Joi = require('joi');

const createTransactionParams = {
    from: Joi.string().min(15).required(),
    fromPrivateKey: Joi.string().min(15).required(),
    to: Joi.string().min(15).required(),
    value: Joi.string(),
    fee: Joi.number()
};

const schema = Joi.object().keys(createTransactionParams).optionalKeys( "fee");
const optionalSchema = schema.optionalKeys("fee");

export function validateCreateTransactionParams(model: CreateTransactionParams) {
    if(model.fee === undefined)
        throw new ValidationError("Fee should be defined");

    let result = Joi.validate(model, optionalSchema);
    if (result.error)
        throw new ValidationError(result.error);
}


export function validateTransactionHash(hash) {
    let result = Joi.validate(hash, Joi.string().min(15).required());
    if (result.error)
        throw new ValidationError(result.error);
}