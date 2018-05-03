import IBtcPriceGateway from "../../../Core/Gateways/IBtcPriceGateway";
import TxPriceResponse from "../../../Core/Models/TxPriceResponse";
import {AxiosInstance} from "axios";

export class BtcPriceGateway implements IBtcPriceGateway {
    private _httpClient: AxiosInstance;
    private estimateFeeApi: string = "https://estimatefee.com/n";

    constructor(httpClient: AxiosInstance) {
        this._httpClient = httpClient;
    }
ы
    async getPrices(): Promise<TxPriceResponse> {
        let fastTask = this._httpClient.get(`${this.estimateFeeApi}/2`);
        let average = this._httpClient.get(`${this.estimateFeeApi}/4`);
        let slow = this._httpClient.get(`${this.estimateFeeApi}/6`);

        let result = await Promise.all([fastTask, average, slow]);
        return {
            safeLow: result[0].data,
            average: result[1].data,
            fast: result[2].data
        }
    }
}