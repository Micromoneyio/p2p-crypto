import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import web3 from "../../External/Crypto/Ethereum/Connector";
import {IEthService} from "../../Core/Services/IEthService";
import {EthGateway} from "../../External/Crypto/Ethereum/Gateway";
import {EthService} from "../../Services/Сrypto/EthService";
import EthGasStationGateway from "../../External/Crypto/Ethereum/EthGasStationGateway";
import IEthGasStationGateway from "../../Core/Gateways/IEthGasStationGateway";
import Axios from "axios";


let ethGasStationGateway:IEthGasStationGateway = new EthGasStationGateway(Axios.create());
let ethGateway:IEthGateway = new EthGateway(web3);
let ethService:IEthService = new EthService(ethGateway, ethGasStationGateway);

export { ethService };