import {BigNumber} from "bignumber.js";

export class EthereumUnitConverter {
    static ethToWei(etherAmount:any): BigNumber{
        return (new BigNumber(etherAmount)).times(10**18);
    }

    static gweiToWei(gweiAmount:any): BigNumber{
        return (new BigNumber(gweiAmount)).times(10**9);
    }

    static weiToEther(weiAmount:any): BigNumber{
        return (new BigNumber(weiAmount)).div(10**18);
    }
}