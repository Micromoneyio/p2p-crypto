import CreateTransactionParams from "../../Core/Models/CreateTransactionParams";
import ValidationError from "../../Core/Models/Exceptions/ValidationError";

import * as Joi from 'joi'

const createTransactionParams = {
    from: Joi.string().min(14).required(),
    fromPrivateKey: Joi.string().min(14).required(),
    to: Joi.string().min(14).required(),
    value: Joi.string(),
    fee: Joi.number()
};

const schema = Joi.object().keys(createTransactionParams).optionalKeys( "fee");
const optionalSchema = schema.optionalKeys("fee");

export function validateCreateTransactionParams(model: CreateTransactionParams) {
    if(!model)
        throw new ValidationError("Transaction info should be provided");

    if(model.fee === undefined)
        throw new ValidationError("Fee should be defined");

    let result = Joi.validate(model, optionalSchema);
    if (result.error)
        throw new ValidationError("Transaction isn't valid. Please check : from, fromPrivateKey, to, value");
}


export function validateTransactionHash(hash) {
    let result = Joi.validate(hash, Joi.string().min(14).required());
    if (result.error)
        throw new ValidationError("Transaction hash should be more then 15 symbols");
}