import {BigNumber} from "bignumber.js";

export class BitcoinUnitConverter {
    static btcToSatoshi(btc:any): BigNumber{
        return (new BigNumber(btc)).times(100000000);
    }

    static satoshiToBtc(satoshi:any): BigNumber{
        return (new BigNumber(satoshi)).div(100000000);
    }
}