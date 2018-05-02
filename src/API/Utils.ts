import {CurrencyEnum} from "../Core/Models/Enums/CurrencyEnum";
import {BitcoinUnitConverter} from "../Services/Utils/BitcoinUnitConverter";
import {EthereumUnitConverter} from "../Services/Utils/EthereumUnitConverter";

export const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };

export const smallestPartToBiggest = (currencyType:CurrencyEnum, amount:number) =>{
    switch (currencyType){
        case CurrencyEnum.ETH:
            return EthereumUnitConverter.weiToEther(amount).toNumber();
        case  CurrencyEnum.BTC:
            return BitcoinUnitConverter.satoshiToBtc(amount).toNumber();
    }
};

export const biggestPartToSmallest = (currencyType:CurrencyEnum, amount:number) =>{
    switch (currencyType){
        case CurrencyEnum.ETH:
            return EthereumUnitConverter.ethToWei(amount).toNumber();
        case  CurrencyEnum.BTC:
            return BitcoinUnitConverter.btcToSatoshi(amount).toNumber();
    }
};