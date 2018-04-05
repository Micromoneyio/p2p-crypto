import {IEthGateway} from "../../Core/Gateways/IEthGateway";
import web3 from "../../External/Crypto/Ethereum/Connector";
import {IEthService} from "../../Core/Services/IEthService";
import {EthGateway} from "../../External/Crypto/Ethereum/Gateway";
import {EthService} from "../../Services/Сrypto/EthService";


let ethGateway:IEthGateway = new EthGateway(web3);
let ethService:IEthService = new EthService(ethGateway);

export { ethService };