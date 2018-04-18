import EthGasStationResponse from "../Models/EthGasStationResponse";

export default interface  IEthGasStationGateway {
    getPrices() : Promise<EthGasStationResponse>
}