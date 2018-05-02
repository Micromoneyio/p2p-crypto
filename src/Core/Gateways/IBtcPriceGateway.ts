import TxPriceResponse from "../Models/TxPriceResponse";

export default interface  IBtcPriceGateway {
    getPrices() : Promise<TxPriceResponse>
}