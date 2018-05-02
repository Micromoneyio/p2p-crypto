import IEthGasStationGateway from "../../../Core/Gateways/IEthGasStationGateway";
import TxPriceResponse from "../../../Core/Models/TxPriceResponse";
import {AxiosInstance} from "axios";
import NotFoundError from "../../../Core/Models/Exceptions/NotFoundError";
import {EthereumUnitConverter} from "../../../Services/Utils/EthereumUnitConverter";
import {BigNumber} from "bignumber.js";

export default class EthGasStationGateway  implements IEthGasStationGateway{
    private _httpClient:AxiosInstance;
    private gasStationApi:string = "https://ethgasstation.info/json/ethgasAPI.json";

    constructor(httpClient:AxiosInstance){
        this._httpClient = httpClient;
    }


    async getPrices(): Promise<TxPriceResponse> {
        let response = await this._httpClient.get(this.gasStationApi);
        if(response.status != 200)
            throw new NotFoundError("Can't fetch gas prices");

        let responseBody = response.data;
        responseBody.safeLow = (new BigNumber(responseBody.safeLow)).div(10);
        responseBody.average = (new BigNumber(responseBody.average)).div(10);
        responseBody.fast = (new BigNumber(responseBody.fast)).div(10);

        return {
            safeLow: EthereumUnitConverter.gweiToWei(responseBody.safeLow).toString(),
            average: EthereumUnitConverter.gweiToWei(responseBody.average).toString(),
            fast: EthereumUnitConverter.gweiToWei(responseBody.fast).toString()
        };
    }

}
